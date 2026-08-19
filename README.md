# MCP conversation agent

A small Python agent that answers ordinary questions from local training data and, when you ask for a summary or brief of the chat, discovers an MCP summarize server and calls it. The server uses **Gemini 2.5 Flash** to write the summary.

## Layout

| File | Role |
| --- | --- |
| `knowledge.py` | Local training-data answers for normal questions |
| `mcp_summarize_server.py` | MCP server exposing `summarize_conversation` (Gemini 2.5 Flash) |
| `mcp_client.py` | MCP client: `tools/list` discovery, then `tools/call` |
| `agent.py` | Chat loop that routes summary requests to the MCP client |
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

You can copy `.env.example` to `.env` instead; `python-dotenv` loads it.

On Debian/Ubuntu, `python3 -m venv` needs the `python3-venv` package (`sudo apt install python3.12-venv`).

## Run

Interactive chat (venv must be active):

```bash
source .venv/bin/activate
python agent.py
```

Scripted demo that asks a few questions, then summarizes via MCP:

```bash
source .venv/bin/activate
python agent.py --demo
```

Or use the helper script (creates the venv if needed):

```bash
chmod +x run.sh
./run.sh --demo
```

Discover tools on the summarize server without the chat loop:

```bash
source .venv/bin/activate
python mcp_client.py --demo
```

## How it works

1. You ask a normal question. The agent matches it against `knowledge.py` and replies from that training data. Gemini is not used.
2. Conversation turns are stored in memory.
3. You ask to summarize, recap, or create a brief of the past conversation.
4. The MCP client launches `mcp_summarize_server.py` over stdio, calls `list_tools()`, selects the summarize tool, and calls it with the transcript.
5. The server sends the transcript to `gemini-2.5-flash` and returns the brief.

Local tests (no Gemini call):

```bash
source .venv/bin/activate
python -m unittest discover -s tests -v
```

