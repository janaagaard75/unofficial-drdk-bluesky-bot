import type { Config } from "@netlify/functions";

export default async (request: Request) => {
  const { next_run } = await request.json();

  console.log("Received event! Next invocation at:", next_run);
};

export const config: Config = {
  schedule: "@monthly",
};
