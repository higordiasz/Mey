### Mey - Bot Discord

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

Go to json/token.json and put your token

## Features & Commands

> Note: The default prefix is '!', to modific go in json/config.json

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
