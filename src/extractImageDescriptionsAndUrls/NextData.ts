export interface NextData {
  props?: {
    pageProps?: {
      viewProps?: {
        resource?: {
          head?: Array<{
            images: Array<{
              default?: {
                description?: string;
                url?: string;
              };
            }>;
            /** ImageCollectionComponent */
            type: string;
          }>;
        };
      };
    };
  };
}
