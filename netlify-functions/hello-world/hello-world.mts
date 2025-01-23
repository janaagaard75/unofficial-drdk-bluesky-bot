import { Context } from "@netlify/functions";

export default (request: Request, _context: Context) => {
  try {
    const urlObject = new URL(request.url);
    const subject = urlObject.searchParams.get("name") ?? "World";
    return new Response(`Hello ${subject}.`);
  } catch (error) {
    return new Response(error.toString(), {
      status: 500,
    });
  }
};
