# 07 — Start another game

## User flow

1. After a match finishes, a participant chooses to start another game.
2. The application creates the next local match and begins the same
   invitation/reply-link pairing flow.
3. The participant sends the new invitation and completes pairing before play.

## Behavior and rules

- A new match does not modify a completed match or its replay data.
- The next match belongs to the same game series when begun from a completed
  series: match 2 follows match 1, and so on.
- X starts odd-numbered matches and O starts even-numbered matches.
- Starting another game uses the same manual invitation/reply-link flow; it
  does not assume the previous peer remains connected.

## States and acceptance criteria

- A completed game presents a clear path to start another game.
- The new match has a new record and prior completed matches remain replayable.
- The participant receives an invitation link and the same waiting-for-reply
  guidance as for the first match.
