import type { Config } from "@netlify/functions";
import { postNewLinks } from "../../src/postNewLinks";

export default async (request: Request) => {
  await postNewLinks(request);
};

export const config: Config = {
  schedule: "*/6 * * * *",
};
