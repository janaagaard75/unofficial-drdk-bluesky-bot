import { AtpAgent } from "@atproto/api";
import * as dotenv from "dotenv";
import * as process from "process";

dotenv.config();

const agent = new AtpAgent({
  service: "https://bsky.social",
});

async function main() {
  await agent.login({
    identifier: process.env["BLUESKY_USERNAME"]!,
    password: process.env["BLUESKY_PASSWORD"]!,
  });
  // await agent.post({
  //   text: "🙂",
  // });
  console.log("Just posted!");
}

main();
