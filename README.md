# steam-unfollow-games

A small browser console script that unfollows **all** games on your Steam
"Followed" list automatically. Handy if you follow hundreds or thousands of
games and don't want to click "Unfollow" one by one.

> Not affiliated with or endorsed by Valve. Use at your own risk.

## Features

- No installation, no extensions, no login credentials needed
- Works with Steam's virtualized game list (only visible items exist in the DOM)
- Random delay between actions to reduce the chance of rate limiting
- Test mode via `LIMIT`, so you can try it on a few games first
- Can be stopped any time from the console

## Usage

1. Log in to Steam in your browser (not the Steam desktop app).
2. Open your profile's Games page, **Followed** tab:
   `https://steamcommunity.com/id/<YOUR_ID>/games?tab=followed`
3. Press `F12` and open the **Console** tab.
4. Copy the contents of [`unfollow-all.js`](./unfollow-all.js), paste it
   into the console and press Enter.
5. Check that the first 3 games were unfollowed (default `LIMIT = 3`).
6. Change `LIMIT = 3` to `LIMIT = Infinity` and run the script again to
   unfollow everything.

To stop the script at any time, type this in the console:

```js
stopUnfollow = true
```

## Configuration

| Option            | Default | Description                                                                 |
| ----------------- | ------- | --------------------------------------------------------------------------- |
| `LIMIT`           | `3`     | Max number of games to unfollow. Use `Infinity` for all.                    |
| `OPEN_MENU_FIRST` | `false` | Set to `true` if clicking "Unfollow" does nothing; opens the `...` menu first. |

## Notes

- **Time:** roughly 1 second per game, so ~3500 games take about an hour.
  Keep the tab open and visible, since background tabs may be throttled.
- **Rate limiting:** if Steam starts ignoring clicks, stop the script, wait
  a while and increase the delay in the script.
- **Steam UI changes:** Steam changes its page structure from time to time.
  The script matches buttons by their text ("Unfollow") instead of CSS
  classes to stay as robust as possible, but it may still break. Issues and
  pull requests are welcome.
- **Language:** the script looks for the English button label "Unfollow".
  If your Steam is set to another language, change that string in the script.
- This only unfollows games. It does not remove games from your library.

## Disclaimer

This script automates clicks in your own browser session. It does not use
any private API and does not collect or send any data. Use it responsibly
and at your own risk.

## License

[MIT](./LICENSE)
