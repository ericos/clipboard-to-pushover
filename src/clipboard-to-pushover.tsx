import { Clipboard, getPreferenceValues, showHUD } from "@raycast/api";

import { sendToPushover } from "./pushover";

interface Preferences {
  userKey: string;
  apiToken: string;
}

export default async function command() {
  const preferences = getPreferenceValues<Preferences>();
  const clipboardText = await Clipboard.readText();

  if (!clipboardText) {
    await showHUD("No text in clipboard");
    return;
  }

  try {
    const success = await sendToPushover(
      preferences.userKey,
      preferences.apiToken,
      clipboardText
    );

    if (success) {
      await showHUD("Sent to Pushover");
    } else {
      await showHUD("Failed to send to Pushover");
    }
  } catch (error) {
    console.error(error);
    await showHUD("Error sending to Pushover");
  }
}