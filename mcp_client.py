"""MCP client that discovers the summarize server's tools and calls them."""

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


def summarize_server_params() -> StdioServerParameters:
    """Launch parameters for the local summarize MCP server over stdio."""
    return StdioServerParameters(
        command=sys.executable,
        args=[str(SERVER_PATH)],
        env=_server_env(),
        cwd=str(SERVER_PATH.parent),
    )


def discover_summarize_tool(tools: list[Tool]) -> Tool:
    """Pick the conversation-summarize tool from a tools/list result."""
    if not tools:
        raise RuntimeError("MCP summarize server advertised no tools.")

    for tool in tools:
        if tool.name == "summarize_conversation":
            return tool

    for tool in tools:
        blob = f"{tool.name} {tool.description or ''}".lower()
        if "summar" in blob:
            return tool

    names = ", ".join(tool.name for tool in tools)
    raise RuntimeError(f"No summarize tool discovered. Available tools: {names}")


def _text_from_result(result: Any) -> str:
    if getattr(result, "is_error", False):
        bits = []
        for block in getattr(result, "content", []) or []:
            if isinstance(block, TextContent):
                bits.append(block.text)
        raise RuntimeError(" ".join(bits) or "MCP summarize tool returned an error.")

    structured = getattr(result, "structured_content", None)
    if isinstance(structured, dict):
        for key in ("result", "summary", "text"):
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
    raise RuntimeError("MCP summarize tool returned no text.")


class SummarizeMCPClient:
    """Discovers summarize-server tools over stdio, then calls the matching tool."""

    def __init__(self) -> None:
        self._client: Client | None = None
        self.discovered_tools: list[Tool] = []
        self.summarize_tool: Tool | None = None

    async def __aenter__(self) -> "SummarizeMCPClient":
        # Launch the summarize server as a stdio subprocess, then speak MCP.
        self._client = Client(stdio_client(summarize_server_params()))
        await self._client.__aenter__()
        listed = await self._client.list_tools()
        self.discovered_tools = list(listed.tools)
        self.summarize_tool = discover_summarize_tool(self.discovered_tools)
        return self

    async def __aexit__(self, exc_type, exc, tb) -> None:
        if self._client is not None:
            await self._client.__aexit__(exc_type, exc, tb)
            self._client = None

    def describe_discovery(self) -> str:
        lines = ["Discovered MCP tools:"]
        for tool in self.discovered_tools:
            marker = " (will call this)" if self.summarize_tool and tool.name == self.summarize_tool.name else ""
            desc = (tool.description or "").splitlines()[0]
            lines.append(f"  - {tool.name}{marker}: {desc}")
        return "\n".join(lines)

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


async def _demo() -> None:
    sample = (
        "User: What is MCP?\n"
        "Agent: MCP is the Model Context Protocol. A client discovers tools on a server "
        "and then calls them.\n"
        "User: What model writes our summaries?\n"
        "Agent: Gemini 2.5 Flash, via the summarize MCP server."
    )
    async with SummarizeMCPClient() as client:
        print(client.describe_discovery())
        print("\nCalling discovered summarize tool...\n")
        summary = await client.summarize(sample, style="brief")
        print(summary)


def main() -> None:
    parser = argparse.ArgumentParser(description="MCP client for the summarize server.")
    parser.add_argument(
        "--demo",
        action="store_true",
        help="Discover tools and summarize a sample conversation.",
    )
    args = parser.parse_args()
    if not args.demo:
        parser.print_help()
        return
    asyncio.run(_demo())


if __name__ == "__main__":
    main()
