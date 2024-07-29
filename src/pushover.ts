import fetch from 'node-fetch';

const PUSHOVER_API_URL = 'https://api.pushover.net/1/messages.json';

interface PushoverResponse {
  status: number;
  request: string;
  receipt?: string; // Present only for priority=2 notifications
}

export async function sendToPushover(
  userKey: string,
  apiToken: string,
  message: string
): Promise<boolean> {
  const response = await fetch(PUSHOVER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: apiToken,
      user: userKey,
      message: message,
    }),
  });

  const data = await response.json() as PushoverResponse;
  return data.status === 1;
}