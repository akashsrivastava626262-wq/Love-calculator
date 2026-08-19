"""MCP discovery tests (no Gemini call)."""

from __future__ import annotations

import asyncio
import unittest

from mcp import Client

from mcp_client import AgentMCPClient
from mcp_summarize_server import mcp


class MCPDiscoveryTests(unittest.TestCase):
    def test_in_memory_lists_both_tools(self) -> None:
        async def run() -> None:
            async with Client(mcp) as client:
                listed = await client.list_tools()
                names = [tool.name for tool in listed.tools]
                self.assertIn("answer_question", names)
                self.assertIn("summarize_conversation", names)

        asyncio.run(run())

    def test_stdio_client_discovers_both_tools(self) -> None:
        async def run() -> None:
            async with AgentMCPClient() as client:
                self.assertIsNotNone(client.answer_tool)
                self.assertIsNotNone(client.summarize_tool)
                assert client.answer_tool is not None
                assert client.summarize_tool is not None
                self.assertEqual(client.answer_tool.name, "answer_question")
                self.assertEqual(client.summarize_tool.name, "summarize_conversation")
                self.assertIn("Gemini 2.5 Flash", client.answer_tool.description or "")
                self.assertIn("Gemini 2.5 Flash", client.summarize_tool.description or "")

        asyncio.run(run())


if __name__ == "__main__":
    unittest.main()
