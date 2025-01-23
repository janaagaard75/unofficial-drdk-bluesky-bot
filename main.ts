import { AtpAgent } from "@atproto/api";
import * as dotenv from "dotenv";
import Parser from "rss-parser";

dotenv.config();

const agent = new AtpAgent({
  service: "https://bsky.social",
});

async function main() {
  const parser = new Parser();
  const newsFeed = await parser.parseURL(
    "https://www.dr.dk/nyheder/service/feeds/senestenyt"
  );

  for (const item of newsFeed.items) {
    console.log(item.title);
  }

  // await agent.login({
  //   identifier: process.env["BLUESKY_USERNAME"]!,
  //   password: process.env["BLUESKY_PASSWORD"]!,
  // });

  // try {
  //   await agent.post({
  //     text: "🙂",
  //   });
  // } catch (error) {
  //   console.error(error);
  // }
}

main();
