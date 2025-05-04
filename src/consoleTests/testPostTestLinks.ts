import { AtpAgent } from "@atproto/api";
import { getEnvironmentVariableValue } from "../getEnvironmentVariableValue";
import { postLink } from "../postNewLinks/postLink";
import { createPlainTextString } from "../shared/brandedTypes/createPlainTextString";
import { testUrls } from "./testUrls";

const testPostTestLinks = async () => {
  const testAgent = new AtpAgent({
    service: "https://bsky.social",
  });
  await testAgent.login({
    identifier: getEnvironmentVariableValue("BLUESKY_TEST_USERNAME"),
    password: getEnvironmentVariableValue("BLUESKY_TEST_PASSWORD"),
  });

  let number = 1;
  for (const url of testUrls) {
    await postLink(
      testAgent,
      createPlainTextString(`Dummy title ${number}`),
      url,
    );
    number++;
  }
};

await testPostTestLinks();
