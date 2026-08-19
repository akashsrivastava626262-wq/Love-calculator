"""MCP server that summarizes conversations with Gemini 2.5 Flash."""

from __future__ import annotations

import os

from dotenv import load_dotenv
from google import genai
from google.genai import types
from mcp.server import MCPServer

load_dotenv()

GEMINI_MODEL = "gemini-2.5-flash"

mcp = MCPServer(
    "conversation-summarizer",
    instructions=(
        "This server summarizes past conversations. Discover the summarize_conversation "
        "tool and call it with the transcript. Summaries are produced by Gemini 2.5 Flash."
    ),
)


def _gemini_client() -> genai.Client:
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        raise RuntimeError(
            "Set GEMINI_API_KEY or GOOGLE_API_KEY so the summarize server can call Gemini."
        )
    return genai.Client(api_key=api_key)


@mcp.tool(title="Summarize conversation")
def summarize_conversation(conversation: str, style: str = "brief") -> str:
    """Summarize a past conversation using Gemini 2.5 Flash.

    Args:
        conversation: Full transcript of the past conversation to summarize.
        style: Summary style: 'brief', 'detailed', or 'bullets'.
    """
    conversation = (conversation or "").strip()
    if not conversation:
        return "There is no conversation yet to summarize."

    style = (style or "brief").strip().lower()
    if style not in {"brief", "detailed", "bullets"}:
        style = "brief"

    style_instructions = {
        "brief": "Write a short paragraph brief (about 4-6 sentences).",
        "detailed": "Write a structured summary with a short overview and key points.",
        "bullets": "Write a concise bullet list of the main topics and outcomes.",
    }[style]

    prompt = (
        f"{style_instructions}\n"
        "Capture the topics discussed, questions asked, and answers given. "
        "Do not invent details that are not in the transcript.\n\n"
        f"Conversation transcript:\n{conversation}"
    )

    client = _gemini_client()
    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.2,
            system_instruction=(
                "You summarize chat transcripts. Be faithful to the source. "
                "Use Gemini 2.5 Flash quality: clear, compact, and useful."
            ),
            thinking_config=types.ThinkingConfig(thinking_budget=0),
        ),
    )
    text = (response.text or "").strip()
    if not text:
        raise RuntimeError("Gemini 2.5 Flash returned an empty summary.")
    return text


if __name__ == "__main__":
    mcp.run()
