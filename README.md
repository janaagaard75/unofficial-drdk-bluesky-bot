# Bluesky Bots

Repository for [my](https://bsky.app/profile/janaagaard.com) two [Bluesky](https://bsky.app/) bots, the [Unofficial Hacker News frontpage bot](https://bsky.app/profile/hn-frontpage-bot.bsky.social) and the Danish [Uofficiel dr.dk nyheder bot on Bluesky](https://bsky.app/profile/drdk-nyheder-bot.bsky.social).

The bots looks for new stuff on either page and post a link to Bluesky with a summary of the linked article. The Hacker News bot link to articles from the [Hacker News frontpage](https://news.ycombinator.com/). The dr.dk bot links to [news articles from dr.dk](https://www.dr.dk/nyheder).

## Tech stack

The bots are written in [TypeScript](https://www.typescriptlang.org/) and run on [Node.js](https://nodejs.org/) hosted on [GitHub Actions](https://docs.github.com/en/actions). The dr.dk bot came first and is simpler in that all the articles here follow the same HTML struture, so it was a lot easier to extract the article text to summarize. The Hacker News bot does this by loading the articles pages through [Puppeteer](https://pptr.dev/) and then extracting the article text with [Readability.js](https://github.com/mozilla/readability). Summarization is done with [Google: Gemini 2.5 Flash](https://ai.google.dev/gemini) through the [OpenRouter API](https://openrouter.ai/) to make it easy to switch between models. Posting is done with the [Bluesky API](https://atproto.com/docs/api). The Hacker News articles are found using the [Hacker News API](https://github.com/HackerNews/API) and dr.dk news articles come from the [DR Nyheder som RSS-feed](https://www.dr.dk/service/dr-nyheder-som-rss-feed-1).
