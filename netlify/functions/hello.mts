import { Context } from "@netlify/functions";

export default async (_request: Request, _context: Context) => {
  return new Response("Hello from Netlify Functions!");
};
