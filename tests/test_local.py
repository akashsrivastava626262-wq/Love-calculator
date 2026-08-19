"""Local tests that do not call Gemini."""

from __future__ import annotations

import asyncio
import unittest

from agent import ConversationAgent
from knowledge import answer_from_training_data
from mcp_client import discover_summarize_tool
from mcp.types import Tool


class KnowledgeTests(unittest.TestCase):
    def test_mcp_question(self) -> None:
        answer = answer_from_training_data("What is MCP?")
        self.assertIn("Model Context Protocol", answer)

    def test_unknown_question(self) -> None:
        answer = answer_from_training_data("What is the airspeed of an unladen swallow?")
        self.assertIn("training data", answer.lower())


class AgentRoutingTests(unittest.TestCase):
    def test_summary_intent(self) -> None:
        agent = ConversationAgent()
        self.assertTrue(agent.wants_summary("Please summarize our past conversation"))
        self.assertTrue(agent.wants_summary("create a brief"))
        self.assertTrue(agent.wants_summary("recap"))
        self.assertFalse(agent.wants_summary("What is MCP?"))
        self.assertFalse(agent.wants_summary("Which model writes the summaries?"))

    def test_local_answers_keep_history(self) -> None:
        agent = ConversationAgent()

        async def run() -> None:
            reply = await agent.handle("What is the capital of France?")
            self.assertIn("Paris", reply)
            self.assertEqual(len(agent.history), 2)

        asyncio.run(run())


class DiscoveryHelperTests(unittest.TestCase):
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
