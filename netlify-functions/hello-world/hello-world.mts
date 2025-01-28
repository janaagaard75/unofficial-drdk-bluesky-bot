import { Context } from "@netlify/functions";
import { isDefined } from "./isDefined";

export default (request: Request, _context: Context) => {
  try {
    const urlObject = new URL(request.url);
    const subject = isDefined(urlObject.searchParams.get("name") ?? "World");

    return new Response(
      `Hello ${subject}. (Environment test: ${process.env["NOT_A_SECRET"]})`
    );
  } catch (error) {
    return new Response(error.toString(), {
      status: 500,
    });
  }
};
