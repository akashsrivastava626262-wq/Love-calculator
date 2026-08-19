"""MCP server for general Q&A and conversation summaries via Gemini 2.5 Flash."""

from __future__ import annotations

import os

from dotenv import load_dotenv
from google import genai
from google.genai import types
from mcp.server import MCPServer

load_dotenv()

GEMINI_MODEL = "gemini-2.5-flash"

mcp = MCPServer(
    "gemini-agent-server",
    instructions=(
        "This server answers general questions and summarizes past conversations. "
        "Use answer_question for open-ended user queries and summarize_conversation "
        "for recap or brief requests. Both tools use Gemini 2.5 Flash."
    ),
)


def _gemini_client() -> genai.Client:
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        raise RuntimeError(
            "Set GEMINI_API_KEY or GOOGLE_API_KEY so the MCP server can call Gemini."
        )
    return genai.Client(api_key=api_key)


def _generate(prompt: str, *, system_instruction: str, temperature: float = 0.4) -> str:
    client = _gemini_client()
    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=temperature,
            system_instruction=system_instruction,
            thinking_config=types.ThinkingConfig(thinking_budget=0),
        ),
    )
    text = (response.text or "").strip()
    if not text:
        raise RuntimeError("Gemini 2.5 Flash returned an empty response.")
    return text


@mcp.tool(title="Answer question")
def answer_question(question: str, context: str = "") -> str:
    """Answer a general user question using Gemini 2.5 Flash.

    Args:
        question: The user's question or request on any topic.
        context: Optional earlier conversation turns for follow-up questions.
    """
    question = (question or "").strip()
    if not question:
        return "Please ask a question."

    context = (context or "").strip()
    prompt_parts = [f"User question:\n{question}"]
    if context:
        prompt_parts.insert(0, f"Earlier conversation:\n{context}\n")
    prompt = "\n".join(prompt_parts)

    return _generate(
        prompt,
        system_instruction=(
            "You are a helpful general-purpose assistant. Answer clearly and accurately "
            "on any topic the user asks about. Use the conversation context when it helps "
            "resolve follow-ups. If you are unsure, say so instead of inventing facts."
        ),
        temperature=0.4,
    )


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

    return _generate(
        prompt,
        system_instruction=(
            "You summarize chat transcripts. Be faithful to the source. "
            "Use Gemini 2.5 Flash quality: clear, compact, and useful."
        ),
        temperature=0.2,
    )


if __name__ == "__main__":
    mcp.run()
