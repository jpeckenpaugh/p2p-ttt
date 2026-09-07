# 06 — Replay a completed local match

## User flow

1. A participant opens a completed match from local history.
2. The application presents its moves in recorded order.
3. The participant reviews the completed board and outcome.

## Behavior and rules

- Replay uses the participant's own saved completed-match data.
- Replay requires neither a current peer connection nor peer availability.
- The replay does not modify the recorded match.

## States and acceptance criteria

- A participant can find and open a completed match after reloading the app.
- The replay reproduces the moves in their recorded order and shows the final
  board and outcome.
- If there are no completed matches, or selected replay data is unavailable,
  the app clearly says that it cannot show a replay.
