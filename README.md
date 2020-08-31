### (i)NEI-MUSIC REPO IS AVAILABLE AT GITHUB NOW!
[Tap here to go to Our GitHub Repo!](https://github.com/nekunei/nei-music)

![nei-music](https://cdn.glitch.com/1a3dfe50-5648-4538-9499-d5a39ac7b798%2FUntitled71_20200720095138.png?v=1595213533503)
> Play your Cool Song at This bot. Free for remix...

## Requirements

1. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
2. YouTube Data API v3 Key **[Guide](https://developers.google.com/youtube/v3/getting-started)**
 2.1 Soundcloud Client ID **[Guide](https://github.com/zackradisic/node-soundcloud-downloader)**
3. Node.js v12.0.0 or latest

## Getting started
```javascript
npm i
```


## Configuration

Go to .env File and fill out the values:

```json
TOKEN=
YOUTUBE_API_KEY=
SOUNDCLOUD_CLIENT_ID=
MAX_PLAYLIST_SIZE=10
PREFIX=!
DOMAIN=
```

## Features & Commands

> Note: The default prefix is '!'

* 🎶 Play music from YouTube via url
  * `!play https://www.youtube.com/watch?v=GLvohMXgcBo`
* 🔎 Play music from YouTube via search query
  * `!play under the bridge red hot chili peppers`
* 📃 Play youtube playlists via url
  * `!playlist https://www.youtube.com/watch?v=YlUKcNNmywk&list=PL5RNCwK3GIO13SR_o57bGJCEmqFAwq82c`
* 🔎 Play youtube playlists via search query
  * `!playlist linkin park meteora`
* Command Handler from [discordjs.guide](https://discordjs.guide/)
* Queue system (!queue)
* Toggle Loop / Repeat (!loop)
* Volume control (!volume)
* Pause (!pause)
* Resume (!resume)
* Skip (!skip)
* Toggle pruning of bot messages (!pruning)
* Help (!help)

## Credits
Big Thanks to [__Eritislami__](https://github.com/eritislami) For the Repos.

Improved & Modified by [__@yDevs__](https://glitch.com/@yDevs)

Support Our <a href="https://discord.gg/VKJ6f7v">Discord Server</a>
# ChangeLog
* 1.2.1
 * Some Fancy updates
* 1.2.0 
 * Added:
   - Soundcloud Support
   - Search Command
   - Lyrics Command 
   - Remove command
   - SkipTo Command
   - NowPlaying Command
   - And Few Some Cool command Added!
   - Bug Fixes

* 1.1.2 
  * Making .env For Securing Your TOKEN.