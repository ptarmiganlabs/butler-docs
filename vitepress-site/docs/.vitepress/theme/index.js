import DefaultTheme from "vitepress/theme";
import { theme, useOpenapi } from "vitepress-openapi/client";
import "vitepress-openapi/dist/style.css";

import spec from "../../public/openapi/butler_latest.json";

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    // Set the OpenAPI specification.
    useOpenapi({
      spec,
      config: {
        // Optional: Configure the theme
        // hideInfo: false,
        // hideServers: false,
      },
    });

    // Use the theme.
    theme.enhanceApp({ app });
  },
};
