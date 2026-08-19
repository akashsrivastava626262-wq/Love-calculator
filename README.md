# MCP conversation agent

A Python agent that answers **general questions on any topic** and summarizes past conversations. Both flows go through an MCP server that uses **Gemini 2.5 Flash**.

## Layout

| File | Role |
| --- | --- |
| `mcp_summarize_server.py` | MCP server with `answer_question` and `summarize_conversation` (Gemini 2.5 Flash) |
| `mcp_client.py` | MCP client: discovers tools via `tools/list`, then calls them |
| `agent.py` | Chat loop that routes Q&A and summary requests to the MCP client |
| `run.sh` | Create `.venv`, install deps, activate, run the agent |

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Set a Gemini API key (the server also accepts `GOOGLE_API_KEY`):

```bash
export GEMINI_API_KEY="your-key"
```

You can copy `.env.example` to `.env` instead; `python-dotenv` loads it. Use a Google AI Studio key (usually starts with `AIza`).

On Debian/Ubuntu, `python3 -m venv` needs the `python3-venv` package (`sudo apt install python3.12-venv`).

## Run

Interactive chat (venv must be active):

```bash
source .venv/bin/activate
python agent.py
```

Scripted demo that asks general questions, then summarizes via MCP:

```bash
source .venv/bin/activate
python agent.py --demo
```

Or use the helper script (creates the venv if needed):

```bash
chmod +x run.sh
./run.sh --demo
```

Discover tools and run sample answer/summary calls without the chat loop:

```bash
source .venv/bin/activate
python mcp_client.py --demo
```

## How it works

1. You ask any question. The agent discovers the MCP `answer_question` tool and calls it with Gemini 2.5 Flash.
2. Conversation turns are stored in memory and passed as optional context for follow-ups.
3. You ask to summarize, recap, or create a brief of the past conversation.
4. The agent discovers `summarize_conversation`, calls it with the transcript, and returns the brief.

Local tests (no Gemini call):

```bash
source .venv/bin/activate
python -m unittest discover -s tests -v
```
