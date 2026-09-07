# 07 — Start another game

## User flow

1. After a match finishes, both players see a clear “Rematch?” choice.
2. Each player accepts or leaves the rematch unaccepted.
3. After both accept, the application creates the next local match in the
   existing connected series.

## Behavior and rules

- A new match does not modify a completed match or its replay data.
- The next match belongs to the same game series when begun from a completed
  series: match 2 follows match 1, and so on.
- Players retain their X/O assignments for the series.
- X starts odd-numbered matches and O starts even-numbered matches.
- Starting another game uses the existing connection; a new invitation begins
  a separate series at match 1.
- A rematch begins only after both players have accepted it.

## States and acceptance criteria

- A completed game presents a clear path to start another game.
- The new match has a new record and prior completed matches remain replayable.
- Both connected participants see the next match and its correct starting
  player.
- If either player has not accepted, no next-match record is created.
