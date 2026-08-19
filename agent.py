"""Conversation agent backed by an MCP server for Q&A and summaries."""

from __future__ import annotations

import argparse
import asyncio
import re
import sys
from dataclasses import dataclass, field

from dotenv import load_dotenv

from mcp_client import AgentMCPClient

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
    _mcp: AgentMCPClient | None = field(default=None, repr=False)

    def remember(self, role: str, text: str) -> None:
        self.history.append((role, text))

    def transcript(self) -> str:
        if not self.history:
            return ""
        return "\n".join(f"{role}: {text}" for role, text in self.history)

    def prior_context(self) -> str:
        if len(self.history) <= 1:
            return ""
        return "\n".join(f"{role}: {text}" for role, text in self.history[:-1])

    def wants_summary(self, message: str) -> bool:
        text = message.strip()
        if not text:
            return False
        if SUMMARIZE_RE.search(text) and PAST_CHAT_RE.search(text):
            return True
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

    async def _client(self) -> AgentMCPClient:
        if self._mcp is None:
            self._mcp = AgentMCPClient()
            await self._mcp.__aenter__()
        return self._mcp

    async def close(self) -> None:
        if self._mcp is not None:
            await self._mcp.__aexit__(None, None, None)
            self._mcp = None

    async def handle(self, message: str) -> str:
        text = message.strip()
        if not text:
            return "Please type a question, or ask me to summarize our conversation."

        if HELP_RE.match(text):
            return (
                "Ask me anything. I discover the MCP answer_question tool and call it "
                "(Gemini 2.5 Flash). Ask me to summarize, recap, or create a brief of our "
                "past conversation and I will call summarize_conversation instead."
            )

        self.remember("User", text)
        client = await self._client()

        if self.wants_summary(text):
            if len(self.history) <= 1:
                reply = "We do not have earlier messages to summarize yet. Ask me something first."
                self.remember("Agent", reply)
                return reply

            discovery = client.describe_discovery(active_tool=client.summarize_tool)
            summary = await client.summarize(self.transcript(), style=self.summary_style(text))
            reply = f"{discovery}\n\nSummary (Gemini 2.5 Flash via MCP):\n{summary}"
            self.remember("Agent", reply)
            return reply

        discovery = client.describe_discovery(active_tool=client.answer_tool)
        answer = await client.answer(text, context=self.prior_context())
        reply = f"{discovery}\n\nAnswer (Gemini 2.5 Flash via MCP):\n{answer}"
        self.remember("Agent", reply)
        return reply


async def run_repl() -> None:
    agent = ConversationAgent()
    print("MCP conversation agent")
    print("Ask anything, or request a summary of this chat.")
    print("Type 'help' for usage, 'quit' to exit.\n")
    try:
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
    finally:
        await agent.close()


async def run_demo() -> None:
    agent = ConversationAgent()
    turns = [
        "What is photosynthesis?",
        "Who wrote Pride and Prejudice?",
        "Please summarize our past conversation.",
    ]
    try:
        for turn in turns:
            print(f"You: {turn}")
            reply = await agent.handle(turn)
            print(f"\nAgent: {reply}\n")
    finally:
        await agent.close()


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
