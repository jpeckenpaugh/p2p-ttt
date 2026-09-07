# System Architecture

This document describes the architecture for the local-first peer-to-peer
Tic-Tac-Toe POC defined in [concept.md](concept.md). It guides later technical
decisions without adding features or infrastructure.

## Topology

Each participant loads the same static application and runs an independent,
durable local workspace in their own browser.

```text
Host browser                                      Friend browser
------------                                      --------------
UI + game logic                                   UI + game logic
local workspace                                   local workspace
     |                                                  |
invitation link -- ordinary message channel --> invitation link
reply link      <-- ordinary message channel -- reply link
     |                                                  |
     +----------- direct game connection --------------+
```

The ordinary message channel is outside the application. The static site has
no per-game server state, API, database, account system, or signaling service.

## Components and boundaries

| Component | Responsibility |
| --- | --- |
| Static application UI | Presents game, history, replay, piece choice, links, and understandable connection/turn/end states. |
| Local game domain | Applies Tic-Tac-Toe rules, creates series and matches, derives board and outcome from ordered moves, and rejects invalid local actions. |
| Local workspace | Durably stores this browser's series, matches, roles, ordered moves, outcomes, and data needed for replay. It is authoritative only for this participant's record. |
| Link pairing | Creates an invitation from the host's connection information; creates a friend reply from the invitation; lets the host use the returned reply only with its matching local series. |
| Direct game connection | Establishes the browser-to-browser session after the host applies the reply in the still-open invitation page, carries game messages, and reports connection/disconnection to the UI. |

The local workspace and direct connection are separate concerns: persistence
must remain available after a peer disconnects, while the connection exists
only for live play.

## Pairing and connection

1. The host creates a new series, chooses X or O, and creates an invitation
   link.
2. The friend opens the link, creates their local record of that series with
   the complementary role, and creates a reply link.
3. The friend returns the reply through an ordinary message channel.
4. The host applies the reply in the still-open invitation page for the
   matching local series. The browsers then
   establish their direct game connection.

Links contain only the information required for this manual connection ritual;
they are not server-hosted game rooms. Invalid, unusable, or mismatched links
do not create a playable game. The UI must make invitation-created,
waiting-for-reply, connected, opponent-disconnected, connection failure, and
game-finished states clear.

## Series, matches, and moves

A new invitation creates a new series at match 1. A series has stable X/O
assignments. X starts odd-numbered matches and O starts even-numbered matches.

After a completed match, a rematch uses the existing connected series: it does
not create or exchange another invitation or reply link. The next match retains
the same player roles and increments the series match number. Starting a new
invitation instead creates an unrelated series at match 1.

For a live match, each browser records the same ordered move sequence. A move
identifies its match, player role, and selected square. Before recording or
displaying a move, each browser validates that the match is active, the player
is the expected turn, and the square is empty. The board, next turn, and final
outcome are derived from that ordered sequence using ordinary Tic-Tac-Toe
rules. Once a win or draw is reached, no further moves are accepted.

The direct connection promptly carries accepted moves to the peer. A lost
connection ends the POC's shared-play capability and is shown as opponent
disconnected; the application does not claim that shared play continues.

## Durable local history and replay

Each participant records its own completed matches, including ordered moves
and outcome, in its local workspace. Completed history survives reload and
browser restart subject to normal browser storage behavior. A replay reads only
that local completed-match record, reproduces its moves in order, and neither
needs nor changes a peer connection.

Starting a match or rematch never alters completed records. If local history is
unavailable, the application reports that fact rather than implying a shared or
remote copy exists.

## POC boundaries

This architecture intentionally excludes accounts and identity, matchmaking or
lobbies, application-managed invitations, custom backend services, shared
server state, chat, spectators, rankings, multi-device history sync, and
guaranteed connectivity across all network environments. It also does not
introduce card-game mechanics or concealed information.
