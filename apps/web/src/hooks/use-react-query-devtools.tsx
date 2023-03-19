import React, { useState, useEffect, useCallback } from "react";

const ReactQueryDevtools = React.lazy(() =>
  import("@tanstack/react-query-devtools").then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

declare global {
  interface Window {
    toggleQueryDevtools: (toggle: boolean) => void;
  }
}

const useReactQueryDevtools = () => {
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      window.toggleQueryDevtools = (toggle: boolean) => setShowDevtools(toggle);
      window.toggleQueryDevtools(true);
    }
  }, []);

  const DevtoolsComponent = useCallback(
    (props: React.ComponentProps<typeof ReactQueryDevtools>) => {
      return showDevtools ? (
        <React.Suspense fallback={null}>
          <ReactQueryDevtools {...props} />
        </React.Suspense>
      ) : null;
    },
    [showDevtools]
  );

  return DevtoolsComponent;
};

export default useReactQueryDevtools;
