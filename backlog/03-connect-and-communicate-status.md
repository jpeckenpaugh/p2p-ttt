# 03 — Establish and communicate game connection state

## Purpose

Let the host open a reply link to establish a direct browser-to-browser game connection, while keeping both participants informed about the current connection state.

## Acceptance criteria

- Opening the reply link in the host's existing game completes the direct connection when possible.
- Both participants receive a clear connected status before play begins.
- The application makes invitation-created, waiting-for-reply, connected, opponent-disconnected, and game-finished states understandable.
- A failed connection is visible rather than presented as silent waiting.
- After a connection failure, the participant can recover by starting a new invitation.
