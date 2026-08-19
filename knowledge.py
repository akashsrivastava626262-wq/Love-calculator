"""Local training-data knowledge used for ordinary agent answers."""

from __future__ import annotations

import re
from dataclasses import dataclass


@dataclass(frozen=True)
class KnowledgeEntry:
    title: str
    keywords: tuple[str, ...]
    answer: str


TRAINING_DATA: tuple[KnowledgeEntry, ...] = (
    KnowledgeEntry(
        title="This agent",
        keywords=("who are you", "what are you", "your name", "this agent", "capabilities"),
        answer=(
            "I am a conversation agent. I answer questions from my local training data, "
            "and I keep a history of this chat. If you ask for a summary or brief of our "
            "past conversation, I discover the summarize tool on the MCP server and call it. "
            "That server uses Gemini 2.5 Flash to write the summary."
        ),
    ),
    KnowledgeEntry(
        title="MCP",
        keywords=(
            "mcp",
            "model context protocol",
            "mcp server",
            "mcp client",
            "tools/list",
            "discover tools",
        ),
        answer=(
            "The Model Context Protocol (MCP) is a standard way for an agent to talk to "
            "external tools. An MCP server exposes tools, resources, and prompts. An MCP "
            "client connects, lists those capabilities (discovery), and then calls a tool "
            "with arguments. This project uses stdio transport: the client launches the "
            "summarize server as a subprocess and speaks JSON-RPC over stdin/stdout."
        ),
    ),
    KnowledgeEntry(
        title="Summarize server",
        keywords=("summarize", "summary server", "gemini", "2.5 flash", "brief"),
        answer=(
            "The summarize MCP server exposes a `summarize_conversation` tool. When you ask "
            "me to summarize or create a brief of our past conversation, I do not write the "
            "summary myself. I discover that tool and call it. The server then asks Gemini "
            "2.5 Flash to produce the brief."
        ),
    ),
    KnowledgeEntry(
        title="Python venv",
        keywords=("venv", "virtualenv", "virtual environment", "pip", "dependencies"),
        answer=(
            "A Python virtual environment (`venv`) isolates project packages from the rest "
            "of the system. Create one with `python3 -m venv .venv`, activate it with "
            "`source .venv/bin/activate`, then `pip install -r requirements.txt`. This "
            "project is meant to run inside `.venv`."
        ),
    ),
    KnowledgeEntry(
        title="Gemini 2.5 Flash",
        keywords=(
            "gemini",
            "flash",
            "google genai",
            "google ai",
            "which model",
            "summary model",
        ),
        answer=(
            "Gemini 2.5 Flash is a Google generative model used here only for conversation "
            "summaries. The MCP summarize server calls it with the google-genai SDK and the "
            "`gemini-2.5-flash` model id. Regular Q&A in this agent does not go to Gemini; "
            "those answers come from local training data."
        ),
    ),
    KnowledgeEntry(
        title="Photosynthesis",
        keywords=("photosynthesis", "plants", "chlorophyll", "glucose"),
        answer=(
            "Photosynthesis is how plants convert light, water, and carbon dioxide into "
            "glucose and oxygen. Chlorophyll in the leaves captures sunlight. The overall "
            "reaction is 6CO2 + 6H2O + light → C6H12O6 + 6O2."
        ),
    ),
    KnowledgeEntry(
        title="Capital of France",
        keywords=("capital of france", "paris", "france capital"),
        answer="The capital of France is Paris.",
    ),
    KnowledgeEntry(
        title="Python language",
        keywords=("python", "programming language", "what is python"),
        answer=(
            "Python is a high-level programming language known for readable syntax. It is "
            "widely used for scripting, data work, web APIs, and AI tooling. This agent, "
            "its MCP client, and the summarize server are all written in Python."
        ),
    ),
)


_TOKEN_RE = re.compile(r"[a-z0-9]+")
_STOPWORDS = {
    "a",
    "an",
    "and",
    "are",
    "for",
    "from",
    "how",
    "in",
    "is",
    "of",
    "on",
    "or",
    "the",
    "this",
    "to",
    "what",
    "which",
    "who",
    "why",
}


def _tokens(text: str) -> set[str]:
    return {token for token in _TOKEN_RE.findall(text.lower()) if token not in _STOPWORDS}


def answer_from_training_data(query: str) -> str:
    """Return the best matching training-data answer, or a fallback."""
    query_l = query.lower().strip()
    query_tokens = _tokens(query)

    best_entry: KnowledgeEntry | None = None
    best_score = 0.0

    for entry in TRAINING_DATA:
        score = 0.0
        for phrase in entry.keywords:
            if phrase in query_l:
                score += 3.0 + 0.5 * len(phrase.split())
        overlap = query_tokens & _tokens(" ".join(entry.keywords) + " " + entry.title)
        score += len(overlap)
        if score > best_score:
            best_score = score
            best_entry = entry

    if best_entry is None or best_score < 2.0:
        return (
            "I do not have a matching fact in my local training data for that question. "
            "Ask about MCP, this agent, Gemini 2.5 Flash, Python, venv, photosynthesis, "
            "or the capital of France. You can also ask me to summarize our conversation."
        )

    return best_entry.answer
