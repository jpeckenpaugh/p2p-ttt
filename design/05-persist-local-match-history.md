# 05 — Persist local match history

## User flow

1. During a match, each participant's browser records the moves it has
   accepted or received.
2. When the match finishes, each browser records the outcome.
3. After reloading, a participant can find their completed match history.

## Behavior and rules

- Each browser maintains its own durable local record, including ordered moves
  and completed outcome.
- The local record does not require an account, shared server, or an available
  peer.
- Completed history is retained when a new match is started.

## States and acceptance criteria

- A completed match remains available after a reload or browser restart,
  subject to normal browser storage behavior.
- If no completed matches exist, the history view states that there is nothing
  to replay.
- An unavailable or failed local record is reported as unavailable; it is not
  replaced with an implied shared history.
