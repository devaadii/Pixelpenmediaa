import { useEffect } from "react";

const UnicornStudioEmbed = () => {
  useEffect(() => {
    const loadScript = () => {
      if (window.UnicornStudio) {
        window.UnicornStudio.init();
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
      script.async = true;
      script.onload = () => window.UnicornStudio?.init();
      document.body.appendChild(script);
    };

    loadScript();
  }, []);

  return (
    <div
      data-us-project="T6qS9lXKmItEIfS2pSU7"
      style={{ width: "390px", height: "844px" }} data-us-autoplay="true"
    />
  );
};

export default UnicornStudioEmbed;