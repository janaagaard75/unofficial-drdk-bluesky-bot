import { AtpAgent } from "@atproto/api";
import type { Config } from "@netlify/functions";
import Parser from "rss-parser";

interface External {
  description: string;
  thumb: string;
  title: string;
  uri: string;
}

export default async (request: Request) => {
  try {
    const requestJson = await request.json();

    const agent = new AtpAgent({
      service: "https://bsky.social",
    });

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

    const parser = new Parser();
    const newsFeed = await parser.parseURL(
      "https://www.dr.dk/nyheder/service/feeds/senestenyt"
    );

    const newItems = newsFeed.items
      .filter((item) => item.link !== undefined)
      .filter((item) => !postedUris.includes(item.link ?? ""));

    for (const item of newItems) {
      console.log(item.link);

      await agent.post({
        text: item.link,
      });
    }

    console.log(`Received event. Next invocation at: ${requestJson.next_run}.`);
  } catch (error) {
    console.error(error);
  }
};

const isDefined = <T,>(item: T | null | undefined): item is T =>
  item !== undefined && item !== null;

export const config: Config = {
  schedule: "@monthly",
};
