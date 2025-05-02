import { Facet } from "@atproto/api";

export interface Record {
  readonly embed?: {
    readonly external?: {
      readonly description: string;
      readonly title: string;
      readonly uri?: string;
    };
  };
  readonly facets?: ReadonlyArray<Facet>;
}
