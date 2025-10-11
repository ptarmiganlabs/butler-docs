import DefaultTheme from "vitepress/theme";
import { theme, useOpenapi } from "vitepress-openapi/client";
import "vitepress-openapi/dist/style.css";
import { onMounted, watch, nextTick } from "vue";
import { useRoute } from "vitepress";
import mediumZoom from "medium-zoom";

import spec from "../../public/openapi/butler_latest.json";
import ResponsiveImage from "../components/ResponsiveImage.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  async enhanceApp({ app, router }) {
    // Register the ResponsiveImage component globally
    app.component("ResponsiveImage", ResponsiveImage);

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
  setup() {
    const route = useRoute();
    const initZoom = () => {
      // Apply medium-zoom to all images in markdown content and ResponsiveImage components
      mediumZoom(".vp-doc img, .responsive-image", {
        background: "rgba(0, 0, 0, 0.85)",
        margin: 24,
        scrollOffset: 0,
      });
    };

    onMounted(() => {
      initZoom();
    });

    // Re-initialize zoom when navigating to a new page
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
};
