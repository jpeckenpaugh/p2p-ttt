# Local-First Peer-to-Peer Tic-Tac-Toe POC

## Purpose

This proof of concept tests a small but consequential idea: two people can start
and play a browser game without an application backend, account system,
signaling service, or shared database.

The experience is deliberately simple. A person sends a game link through an
ordinary channel such as text message or email. Their friend opens it, sends a
reply link back, and the two browsers then connect directly for the game.

Tic-Tac-Toe is the vehicle, not the destination. It is intentionally simple so
the POC can test the connection and local-first model without mixing in the
private information, dealing, and richer rules of future card games.

## Product concept

The application is a static website. Each participant runs a complete local
copy of the game experience in their own browser. Once connected, the browsers
exchange game moves directly. Each browser also keeps its own durable local
record of the match, so a game can be reloaded and replayed without relying on
a central service.

The only coordination outside the application is the intentional, human action
of forwarding two ordinary links.

```text
Host browser                         Friend browser
------------                         --------------
Create game
Create invitation link ── text/email ──> Open invitation
                                        Create reply link
Apply reply link <──── text/email ───── Send reply

              Direct browser-to-browser game connection
```

The links are not game pages hosted for a particular match. They are simply
deep links to the same static application carrying the information needed for
the two browsers to establish their direct connection.

## Core user journey

### 1. Start a game

The host visits the static application and chooses **Start a game**. The app
creates a new local match and presents a shareable invitation link.

The host sends that link by any ordinary means: text message, email, chat, or
copy/paste. The POC does not need to know or control the delivery channel.

### 2. Accept the invitation

The friend opens the invitation link in a current desktop or mobile browser.
The app clearly identifies that it is joining a game, prepares the friend’s
side of the connection, and presents a reply link.

The friend sends that reply link back to the host through the same or another
ordinary channel.

### 3. Connect

The host keeps the invitation page open and applies the returned reply link
there. The host’s existing game recognizes the match, completes the
browser-to-browser connection, and shows a clear connected status to both
people.

Until the connection is established, the game should explain what each person
needs to do next in plain language. A connection failure should be visible and
recoverable by starting a new invitation; it should never look like the game is
silently waiting on a server.

### 4. Play

The connected players see the same Tic-Tac-Toe board. One player is X and the
other is O. A move is accepted only on the active player’s turn and is promptly
reflected on both boards.

The game records the resulting moves and outcome locally for each participant.
The POC does not require live chat, spectators, rankings, matchmaking, or
accounts.

### 5. Review

At the end of a match, either participant can revisit the locally saved match
and replay the sequence of moves. This establishes that the local database is
durable game state, not merely a temporary network cache.

## Experience principles

- **Human-mediated pairing is a feature.** Sending an invitation and reply
  link is the complete first-version pairing ritual. There is no hidden
  matchmaking or background service.
- **The application is honest about state.** It makes the difference between
  “invitation created,” “waiting for reply,” “connected,” “opponent
  disconnected,” and “game finished” easy to understand.
- **The game remains familiar.** The connection mechanism may be novel, but
  playing Tic-Tac-Toe should feel immediate and conventional.
- **Local data belongs to the participant.** Match history is stored in the
  browser’s local workspace and remains available after a reload or browser
  restart, subject to normal browser storage behavior.
- **No account is implied.** Player names, if included, are display labels for
  the match, not verified identities.

## Conceptual boundaries

The POC has four conceptual parts:

| Part | Role in the experience |
| --- | --- |
| Static application | Delivers the same game website to both people. It has no per-match server state. |
| Local workspace | Keeps each person’s match history and replay data in their own browser. |
| Invitation/reply links | Let two people manually carry connection information through email, text, or another existing channel. |
| Direct game connection | Carries live moves between the two browsers after both links have been exchanged. |

The local workspace is authoritative for what that browser has recorded. During
an active game, both workspaces receive the same ordered sequence of moves.
Tic-Tac-Toe’s fully visible board makes this a clear, low-risk way to test
replicated game state.

## In scope

- A static browser application.
- A two-person Tic-Tac-Toe game.
- Host invitation link and friend reply link exchanged manually.
- Direct browser-to-browser connection after the reply is opened.
- Clear connection and turn status.
- Local durable game history for each participant.
- Replay of completed local matches.
- A simple way to start another game.

## Explicitly out of scope

- User accounts, login, identity verification, or friend lists.
- Matchmaking, lobbies, invitations managed by the application, or push
  notifications.
- A custom backend, API, database, signaling server, or shared server state.
- Social-media integration, QR codes, or automated delivery of links.
- Chat, spectators, tournaments, rankings, payments, or moderation.
- Card-game mechanics, concealed information, dealing, cryptographic shuffle
  protocols, or wagering.
- Multi-device synchronization of a participant’s local history.
- Guaranteed connectivity in every network environment.

## What the POC should demonstrate

The POC is successful when two people can reliably demonstrate the following
end-to-end story:

1. The host creates an invitation link and sends it by text or email.
2. The friend opens it and sends the generated reply link back.
3. The host applies the reply link in the still-open invitation page and the
   two browsers connect directly.
4. Both participants play a complete Tic-Tac-Toe match with matching boards.
5. Each participant reloads the application and can still see and replay the
   completed match.
6. No custom application backend was required for any step.

## Why this is a useful first step

This POC validates the reusable parts of a larger local-first multiplayer
direction while keeping the game itself almost trivial. It tests whether manual
deep-link pairing feels understandable, whether direct browser connectivity is
practical, and whether local durable workspaces make sense for multiplayer
history.

If those fundamentals feel good, later work can apply the same basic topology
to richer games. That later work may need additional product and protocol
decisions, but it need not reopen the question this POC is designed to answer:

> Can two people begin and complete a durable, browser-local, peer-to-peer game
> using only a static application and a simple exchange of links?
