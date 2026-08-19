"""Local tests that do not call Gemini."""

from __future__ import annotations

import asyncio
import unittest
from unittest.mock import AsyncMock, MagicMock, patch

from agent import ConversationAgent
from mcp_client import discover_answer_tool, discover_summarize_tool
from mcp.types import Tool


class AgentRoutingTests(unittest.TestCase):
    def test_summary_intent(self) -> None:
        agent = ConversationAgent()
        self.assertTrue(agent.wants_summary("Please summarize our past conversation"))
        self.assertTrue(agent.wants_summary("create a brief"))
        self.assertTrue(agent.wants_summary("recap"))
        self.assertFalse(agent.wants_summary("What is MCP?"))
        self.assertFalse(agent.wants_summary("Tell me about black holes"))

    def test_general_questions_use_mcp_answer_tool(self) -> None:
        agent = ConversationAgent()
        mock_client = MagicMock()
        mock_client.answer_tool = Tool(
            name="answer_question",
            description="Answer a question",
            inputSchema={"type": "object", "properties": {"question": {"type": "string"}}},
        )
        mock_client.summarize_tool = Tool(
            name="summarize_conversation",
            description="Summarize",
            inputSchema={"type": "object", "properties": {"conversation": {"type": "string"}}},
        )
        mock_client.describe_discovery.return_value = "Discovered MCP tools:\n  - answer_question"
        mock_client.answer = AsyncMock(return_value="Tokyo is the capital of Japan.")
        mock_client.summarize = AsyncMock(return_value="Sample summary.")

        async def run() -> None:
            with patch.object(ConversationAgent, "_client", AsyncMock(return_value=mock_client)):
                reply = await agent.handle("What is the capital of Japan?")
            self.assertIn("answer_question", reply)
            self.assertIn("Tokyo", reply)
            mock_client.answer.assert_awaited_once_with(
                "What is the capital of Japan?",
                context="",
            )
            self.assertEqual(len(agent.history), 2)

        asyncio.run(run())


class DiscoveryHelperTests(unittest.TestCase):
    def test_selects_answer_tool(self) -> None:
        tools = [
            Tool(
                name="summarize_conversation",
                description="Summarize a past conversation",
                inputSchema={"type": "object", "properties": {}},
            ),
            Tool(
                name="answer_question",
                description="Answer a general user question",
                inputSchema={
                    "type": "object",
                    "properties": {"question": {"type": "string"}},
                    "required": ["question"],
                },
            ),
        ]
        chosen = discover_answer_tool(tools)
        self.assertEqual(chosen.name, "answer_question")

    def test_selects_summarize_tool(self) -> None:
        tools = [
            Tool(
                name="other_thing",
                description="Not related",
                inputSchema={"type": "object", "properties": {}},
            ),
            Tool(
                name="summarize_conversation",
                description="Summarize a past conversation",
                inputSchema={
                    "type": "object",
                    "properties": {"conversation": {"type": "string"}},
                    "required": ["conversation"],
                },
            ),
        ]
        chosen = discover_summarize_tool(tools)
        self.assertEqual(chosen.name, "summarize_conversation")


if __name__ == "__main__":
    unittest.main()
