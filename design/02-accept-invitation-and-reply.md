# 02 — Accept an invitation and create a reply

## User flow

1. The friend opens the host's invitation link.
2. The application identifies the action as joining a game and prepares the
   friend's local match record.
3. It presents a shareable reply link and tells the friend to send it to the
   host.

## Behavior and rules

- A valid invitation creates the friend's local side of the same match series
  and preserves the host's role selection.
- The friend receives the other role.
- The reply link contains the information the host needs to complete the direct
  connection; the app does not deliver it itself.
- The friend can copy the reply link.

## States and acceptance criteria

- Before a reply is sent, the application clearly says that the host must open
  it next.
- An invalid or unusable invitation does not create a playable match; the
  visitor sees that joining cannot continue.
- If reply-link creation fails, the app reports the failure rather than showing
  a usable reply link.
