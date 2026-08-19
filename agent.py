"""Conversation agent: local training data for Q&A, MCP summarize for briefs."""

from __future__ import annotations

import argparse
import asyncio
import re
import sys
from dataclasses import dataclass, field

from dotenv import load_dotenv

from knowledge import answer_from_training_data
from mcp_client import SummarizeMCPClient

load_dotenv()

SUMMARIZE_RE = re.compile(
    r"\b("
    r"summar(?:y|ize|ise|ising|izing)|"
    r"brief|"
    r"recap|"
    r"tl;?dr"
    r")\b",
    re.IGNORECASE,
)
PAST_CHAT_RE = re.compile(
    r"\b(conversation|chat|discussion|history|so far|past|our talk|what we (?:said|covered|discussed))\b",
    re.IGNORECASE,
)
HELP_RE = re.compile(r"^\s*(help|\?|commands)\s*$", re.IGNORECASE)
EXIT_RE = re.compile(r"^\s*(exit|quit|q)\s*$", re.IGNORECASE)


@dataclass
class ConversationAgent:
    history: list[tuple[str, str]] = field(default_factory=list)

    def remember(self, role: str, text: str) -> None:
        self.history.append((role, text))

    def transcript(self) -> str:
        if not self.history:
            return ""
        return "\n".join(f"{role}: {text}" for role, text in self.history)

    def wants_summary(self, message: str) -> bool:
        text = message.strip()
        if not text:
            return False
        if SUMMARIZE_RE.search(text) and PAST_CHAT_RE.search(text):
            return True
        # Short commands like "summarize", "create a brief", "recap"
        compact = re.sub(r"\s+", " ", text.lower())
        short_commands = {
            "summarize",
            "summarise",
            "summary",
            "brief",
            "create a brief",
            "create a summary",
            "write a brief",
            "write a summary",
            "recap",
            "tl;dr",
            "tldr",
        }
        return compact in short_commands or compact.startswith(("summarize ", "summarise ", "brief "))

    def summary_style(self, message: str) -> str:
        lower = message.lower()
        if "bullet" in lower:
            return "bullets"
        if "detail" in lower:
            return "detailed"
        return "brief"

    def answer_locally(self, message: str) -> str:
        return answer_from_training_data(message)

    async def handle(self, message: str) -> str:
        text = message.strip()
        if not text:
            return "Please type a question, or ask me to summarize our conversation."

        if HELP_RE.match(text):
            return (
                "Ask me a question and I will answer from local training data. "
                "Ask me to summarize, recap, or create a brief of our past conversation "
                "and I will discover the MCP summarize tool and call it (Gemini 2.5 Flash)."
            )

        self.remember("User", text)

        if self.wants_summary(text):
            if len(self.history) <= 1:
                reply = "We do not have earlier messages to summarize yet. Ask me something first."
                self.remember("Agent", reply)
                return reply

            async with SummarizeMCPClient() as client:
                discovery = client.describe_discovery()
                summary = await client.summarize(self.transcript(), style=self.summary_style(text))
            reply = f"{discovery}\n\nSummary (Gemini 2.5 Flash via MCP):\n{summary}"
            self.remember("Agent", reply)
            return reply

        reply = self.answer_locally(text)
        self.remember("Agent", reply)
        return reply


async def run_repl() -> None:
    agent = ConversationAgent()
    print("MCP conversation agent")
    print("Ask questions from training data, or request a summary of this chat.")
    print("Type 'help' for usage, 'quit' to exit.\n")
    while True:
        try:
            message = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nBye.")
            return
        if EXIT_RE.match(message):
            print("Bye.")
            return
        reply = await agent.handle(message)
        print(f"\nAgent: {reply}\n")


async def run_demo() -> None:
    agent = ConversationAgent()
    turns = [
        "Who are you?",
        "What is MCP?",
        "Which model writes the summaries?",
        "Please summarize our past conversation.",
    ]
    for turn in turns:
        print(f"You: {turn}")
        reply = await agent.handle(turn)
        print(f"\nAgent: {reply}\n")


def main() -> None:
    parser = argparse.ArgumentParser(description="MCP-backed conversation agent.")
    parser.add_argument(
        "--demo",
        action="store_true",
        help="Run a scripted conversation that ends with an MCP summary.",
    )
    args = parser.parse_args()
    if args.demo:
        asyncio.run(run_demo())
        return
    if not sys.stdin.isatty():
        print("No TTY detected. Use `python agent.py --demo` or run interactively.", file=sys.stderr)
        sys.exit(2)
    asyncio.run(run_repl())


if __name__ == "__main__":
    main()
