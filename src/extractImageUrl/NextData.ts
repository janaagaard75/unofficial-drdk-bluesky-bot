export interface NextData {
  readonly props?: {
    readonly pageProps?: {
      readonly viewProps?: {
        readonly resource?: {
          readonly head?: ReadonlyArray<{
            readonly images: ReadonlyArray<{
              readonly default?: {
                readonly description?: string;
                readonly url?: string;
              };
            }>;
            /** ImageCollectionComponent */
            readonly type: string;
          }>;
        };
      };
    };
  };
}
