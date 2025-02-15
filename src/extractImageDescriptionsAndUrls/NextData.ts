export interface NextData {
  props?: {
    pageProps?: {
      viewProps?: {
        resource?: {
          head?: Array<{
            type: "ImageCollectionComponent";
            images: Array<{
              default?: {
                description?: string;
                url?: string;
              };
            }>;
          }>;
        };
      };
    };
  };
}
