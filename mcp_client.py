"""MCP client that discovers the agent server's tools and calls them."""

from __future__ import annotations

import argparse
import asyncio
import os
import sys
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from mcp import Client, StdioServerParameters, stdio_client
from mcp.types import TextContent, Tool

load_dotenv()

SERVER_PATH = Path(__file__).resolve().parent / "mcp_summarize_server.py"


def _server_env() -> dict[str, str]:
    env = {key: value for key, value in os.environ.items() if value is not None}
    for key in ("GEMINI_API_KEY", "GOOGLE_API_KEY"):
        if os.environ.get(key):
            env[key] = os.environ[key]
    return env


def agent_server_params() -> StdioServerParameters:
    """Launch parameters for the local Gemini MCP server over stdio."""
    return StdioServerParameters(
        command=sys.executable,
        args=[str(SERVER_PATH)],
        env=_server_env(),
        cwd=str(SERVER_PATH.parent),
    )


def discover_tool(
    tools: list[Tool],
    *,
    preferred_names: tuple[str, ...],
    keyword: str,
    purpose: str,
) -> Tool:
    """Pick a tool from a tools/list result by exact name, then keyword."""
    if not tools:
        raise RuntimeError("MCP server advertised no tools.")

    for name in preferred_names:
        for tool in tools:
            if tool.name == name:
                return tool

    for tool in tools:
        blob = f"{tool.name} {tool.description or ''}".lower()
        if keyword in blob:
            return tool

    names = ", ".join(tool.name for tool in tools)
    raise RuntimeError(f"No {purpose} tool discovered. Available tools: {names}")


def discover_answer_tool(tools: list[Tool]) -> Tool:
    return discover_tool(
        tools,
        preferred_names=("answer_question",),
        keyword="answer",
        purpose="answer",
    )


def discover_summarize_tool(tools: list[Tool]) -> Tool:
    return discover_tool(
        tools,
        preferred_names=("summarize_conversation",),
        keyword="summar",
        purpose="summarize",
    )


def _text_from_result(result: Any) -> str:
    if getattr(result, "is_error", False):
        bits = []
        for block in getattr(result, "content", []) or []:
            if isinstance(block, TextContent):
                bits.append(block.text)
        raise RuntimeError(" ".join(bits) or "MCP tool returned an error.")

    structured = getattr(result, "structured_content", None)
    if isinstance(structured, dict):
        for key in ("result", "summary", "text", "answer"):
            value = structured.get(key)
            if isinstance(value, str) and value.strip():
                return value.strip()
        if len(structured) == 1:
            value = next(iter(structured.values()))
            if isinstance(value, str) and value.strip():
                return value.strip()

    texts = [
        block.text.strip()
        for block in getattr(result, "content", []) or []
        if isinstance(block, TextContent) and block.text and block.text.strip()
    ]
    if texts:
        return "\n".join(texts)
    raise RuntimeError("MCP tool returned no text.")


class AgentMCPClient:
    """Discovers agent-server tools over stdio, then calls them."""

    def __init__(self) -> None:
        self._client: Client | None = None
        self.discovered_tools: list[Tool] = []
        self.answer_tool: Tool | None = None
        self.summarize_tool: Tool | None = None

    async def __aenter__(self) -> "AgentMCPClient":
        self._client = Client(stdio_client(agent_server_params()))
        await self._client.__aenter__()
        listed = await self._client.list_tools()
        self.discovered_tools = list(listed.tools)
        self.answer_tool = discover_answer_tool(self.discovered_tools)
        self.summarize_tool = discover_summarize_tool(self.discovered_tools)
        return self

    async def __aexit__(self, exc_type, exc, tb) -> None:
        if self._client is not None:
            await self._client.__aexit__(exc_type, exc, tb)
            self._client = None

    def describe_discovery(self, active_tool: Tool | None = None) -> str:
        lines = ["Discovered MCP tools:"]
        for tool in self.discovered_tools:
            marker = " (will call this)" if active_tool and tool.name == active_tool.name else ""
            desc = (tool.description or "").splitlines()[0]
            lines.append(f"  - {tool.name}{marker}: {desc}")
        return "\n".join(lines)

    async def answer(self, question: str, context: str = "") -> str:
        if self._client is None or self.answer_tool is None:
            raise RuntimeError("MCP client is not connected.")

        schema = self.answer_tool.input_schema or {}
        properties = schema.get("properties") if isinstance(schema, dict) else None
        arguments: dict[str, str] = {"question": question}
        if isinstance(properties, dict) and "context" in properties and context.strip():
            arguments["context"] = context

        result = await self._client.call_tool(self.answer_tool.name, arguments)
        return _text_from_result(result)

    async def summarize(self, conversation: str, style: str = "brief") -> str:
        if self._client is None or self.summarize_tool is None:
            raise RuntimeError("MCP client is not connected.")

        schema = self.summarize_tool.input_schema or {}
        properties = schema.get("properties") if isinstance(schema, dict) else None
        arguments: dict[str, str] = {"conversation": conversation}
        if isinstance(properties, dict) and "style" in properties:
            arguments["style"] = style

        result = await self._client.call_tool(self.summarize_tool.name, arguments)
        return _text_from_result(result)


# Backward-compatible alias used by older imports/tests.
SummarizeMCPClient = AgentMCPClient
summarize_server_params = agent_server_params


async def _demo() -> None:
    sample = (
        "User: What is MCP?\n"
        "Agent: MCP is the Model Context Protocol.\n"
        "User: What model powers this server?\n"
        "Agent: Gemini 2.5 Flash."
    )
    async with AgentMCPClient() as client:
        print(client.describe_discovery(active_tool=client.answer_tool))
        print("\nCalling discovered answer tool...\n")
        answer = await client.answer("What is the capital of Japan?")
        print(answer)
        print("\n" + client.describe_discovery(active_tool=client.summarize_tool))
        print("\nCalling discovered summarize tool...\n")
        summary = await client.summarize(sample, style="brief")
        print(summary)


def main() -> None:
    parser = argparse.ArgumentParser(description="MCP client for the Gemini agent server.")
    parser.add_argument(
        "--demo",
        action="store_true",
        help="Discover tools, answer a sample question, and summarize a transcript.",
    )
    args = parser.parse_args()
    if not args.demo:
        parser.print_help()
        return
    asyncio.run(_demo())


if __name__ == "__main__":
    main()
