import React from "react";
// Next
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
// Components
import { Loading } from "@components";
// Helpers
import { magic } from "lib/magic-client";
// Styles
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
