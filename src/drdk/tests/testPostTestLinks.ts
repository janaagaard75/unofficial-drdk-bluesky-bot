import { brand } from "../../shared/brandedTypes/brand";
import { PlainTextString } from "../../shared/brandedTypes/PlainTextString";
import { testAgent } from "../../shared/testAgent";
import { postLink } from "../postLink";
import { testUrls } from "./testUrls";

const testPostTestLinks = async () => {
  let number = 1;
  for (const url of testUrls) {
    await postLink(
      testAgent,
      brand<PlainTextString>(`Dummy title ${number}`),
      url,
    );
    number++;
  }
};

await testPostTestLinks();
