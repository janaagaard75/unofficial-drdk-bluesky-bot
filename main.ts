import { AtpAgent } from "@atproto/api";

const agent = new AtpAgent({
  service: "https://bsky.social",
});

interface External {
  description: string;
  thumb: string;
  title: string;
  uri: string;
}

async function main() {
  // const parser = new Parser();
  // const newsFeed = await parser.parseURL(
  //   "https://www.dr.dk/nyheder/service/feeds/senestenyt"
  // );

  // for (const item of newsFeed.items) {
  //   console.log(item.title);
  // }

  try {
    await agent.login({
      identifier: process.env["BLUESKY_USERNAME"]!,
      password: process.env["BLUESKY_PASSWORD"]!,
    });

    const timeline = await agent.getTimeline({
      limit: 50,
    });

    const feedViewPosts = timeline.data.feed;

    const postedUris = feedViewPosts
      .filter(
        (feedViewPost) =>
          feedViewPost.post.author.did === "did:plc:dlxnthdtaz7qdflht47dpst6"
      )
      .map((feedViewPost) => feedViewPost.post.embed)
      .filter(isDefined)
      .map((embed) => (embed.external as External).uri);

    for (const uri of postedUris) {
      console.log(uri);
    }
  } catch (error) {
    console.error(error);
  }
}

const isDefined = <T>(item: T | null | undefined): item is T =>
  item !== undefined && item !== null;

main();
