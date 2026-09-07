# 03 — Establish and communicate game connection state

## User flow

1. The host opens the friend's reply link in the existing host game.
2. The browsers establish their direct game connection.
3. Both participants see that the game is connected and may begin play.

## Behavior and rules

- The host uses the reply only with its corresponding local invitation/game.
- Play is unavailable until both sides are connected.
- The application presents these understandable states when applicable:
  invitation created, waiting for reply, connected, opponent disconnected, and
  game finished.
- A connection that cannot be established is not represented as silent waiting.

## States and acceptance criteria

- A successful connection is visible to both participants before play begins.
- If the opponent disconnects, the remaining participant sees that status.
- If connection fails, the participant sees the failure and can recover by
  starting a new invitation.
