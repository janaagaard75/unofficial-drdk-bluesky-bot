import { Facet } from "@atproto/api";

export interface Record {
  facets?: Array<Facet>;
  embed?: {
    external?: {
      description: string;
      title: string;
      uri?: string;
    };
  };
}
