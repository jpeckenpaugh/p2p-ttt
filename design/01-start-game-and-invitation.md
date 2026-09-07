# 01 — Start a game and create an invitation

## User flow

1. A visitor chooses **Start a game**.
2. The application creates the host's local record for a new game series at
   match 1 and asks the host to choose X or O.
3. It presents a shareable invitation link and states that the host is waiting
   for a reply.
4. The host copies and sends the link through an ordinary channel.

## Behavior and rules

- Starting a game creates a new local match; it does not alter completed
  history.
- The host selects X or O before the invitation is created.
- The invitation is the shareable information the friend needs to prepare the
  other side of this match; sending it remains outside the application.
- The host can copy the invitation link.

## States and acceptance criteria

- The start action and the host's X/O choice are available before an invitation
  exists.
- After creation, the invitation is visible and copyable, and the application
  clearly says that it is awaiting the friend's reply.
- If link creation cannot complete, no invitation is presented as ready; the
  host sees that creation failed and can start again.
