import { LiFiWidget, WidgetConfig } from "@lifi/widget";
import { useEffect, useMemo, useState } from "react";

export const LifiWidget = () => {
  const [count, setCount] = useState(1);
  const widgetConfig: WidgetConfig = useMemo(() => {
    return {
      integrator: "valv-ui",
      variant: "drawer",
    };
  }, []);

  useEffect(() => {
    if (count < 4) {
      setCount(count + 1);
    }
  }, [count]);

  if (count % 2 === 1) return null;

  return <LiFiWidget config={widgetConfig} />;
};
