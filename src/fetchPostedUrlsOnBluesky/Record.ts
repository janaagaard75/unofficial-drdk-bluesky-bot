import { Facet } from "@atproto/api";

export interface Record {
  embed?: {
    external?: {
      description: string;
      title: string;
      uri?: string;
    };
  };
  facets?: Array<Facet>;
}
