/**
 * steam-unfollow-games
 * Bulk unfollow every game on your Steam "Followed" list.
 *
 * HOW TO USE:
 *  1. Log in to Steam in your browser and open your profile's
 *     Games page, "Followed" tab:
 *     https://steamcommunity.com/id/<YOUR_ID>/games?tab=followed
 *  2. Press F12 and open the "Console" tab.
 *  3. Paste this whole script and press Enter.
 *  4. To stop at any time, type in the console:  stopUnfollow = true
 *
 * Start with LIMIT = 3 to verify it works, then set LIMIT = Infinity.
 * Not affiliated with Valve. Use at your own risk.
 */
(async () => {
  // How many games to unfollow before stopping.
  // Keep it small for a first test run, then change to Infinity.
  const LIMIT = 3;

  // Set to true only if clicking "Unfollow" directly does nothing.
  // In that case the script opens each game's "..." menu before clicking.
  const OPEN_MENU_FIRST = false;

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // Global flag so you can stop the script from the console.
  window.stopUnfollow = false;

  // Find all "Unfollow" buttons currently in the DOM.
  // We match by button text because Steam's CSS class names are
  // auto-generated and change frequently.
  const getButtons = () =>
    [...document.querySelectorAll('button')]
      .filter(b => b.textContent.trim() === 'Unfollow');

  // Extract the app ID from the store link inside the same menu.
  const getAppId = btn =>
    (btn.parentElement.querySelector('a[href*="/app/"]')?.href
      .match(/app\/(\d+)/) || [])[1];

  const attempts = {}; // appId -> number of click attempts
  let done = 0;        // successfully clicked so far
  let idleRounds = 0;  // consecutive rounds with nothing to click

  while (!window.stopUnfollow && done < LIMIT) {
    // Pick the first button we haven't already tried twice.
    // The list is virtualized: only items near the viewport exist in
    // the DOM, so new ones appear as previous ones are removed.
    const btn = getButtons().find(b => (attempts[getAppId(b)] || 0) < 2);

    if (!btn) {
      // Nothing clickable right now. Scroll to load more items,
      // and give up after several empty rounds in a row.
      if (++idleRounds > 5) break;
      window.scrollBy(0, 600);
      await sleep(1500);
      continue;
    }

    idleRounds = 0;
    const id = getAppId(btn);
    attempts[id] = (attempts[id] || 0) + 1; // avoids infinite loops

    if (OPEN_MENU_FIRST) {
      // Open the "..." menu that contains this button.
      btn.closest('[popover]')?.previousElementSibling?.click();
      await sleep(300);
    }

    btn.click();
    done++;
    console.log(`#${done} unfollowed (app ${id})`);

    // Random delay (0.8-1.5s) to avoid Steam rate limiting.
    await sleep(800 + Math.random() * 700);
  }

  console.log(`Finished. Total unfollowed: ${done}`);
})();
