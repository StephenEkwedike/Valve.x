import { LiFiWidget, WidgetConfig } from "@lifi/widget";
import { useMemo } from "react";

export const LifiWidget = () => {
  const widgetConfig: WidgetConfig = useMemo(() => {
    return {
      integrator: "valve-ui",
      variant: "drawer",
    };
  }, []);

  return <LiFiWidget config={widgetConfig} />;
};
