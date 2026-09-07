# 04 — Play a shared Tic-Tac-Toe match

## User flow

1. Connected players see a shared empty board and their assigned X/O roles.
2. The active player selects an empty square.
3. Both boards update, and play continues until a win or draw.

## Behavior and rules

- The host chooses X or O; the friend receives the other role.
- In a newly paired series, the current match is match 1. X starts every
  odd-numbered match (1, 3, 5, ...) and O starts every even-numbered match
  (2, 4, 6, ...).
- Only the active participant may make a move, and only into an empty square.
- Each accepted move is promptly reflected on both boards in the same order.
- A match ends when Tic-Tac-Toe has a winner or the board is full; the outcome
  is recorded and the game is marked finished.

## States and acceptance criteria

- The board shows whose turn is active while the match is in progress.
- A participant cannot make a move while it is the peer's turn, after the match
  has finished, or into an occupied square.
- A connection loss is communicated as opponent disconnected; the application
  does not claim that play can continue as a shared game.
