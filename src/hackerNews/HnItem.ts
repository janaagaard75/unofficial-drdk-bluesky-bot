export interface HnItem {
  by: string | undefined;
  dead: boolean | undefined;
  delete: boolean | undefined;
  descendants: number | undefined;
  id: number;
  kids: ReadonlyArray<number> | undefined;
  parent: number | undefined;
  parts: ReadonlyArray<number> | undefined;
  poll: number | undefined;
  score: number | undefined;
  text: string | undefined;
  time: number | undefined;
  title: string | undefined;
  type: "comment" | "job" | "poll" | "pollopt" | "story" | undefined;
  url: string | undefined;
}
