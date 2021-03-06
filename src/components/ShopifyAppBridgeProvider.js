import React from "react";
import { Provider } from "@shopify/app-bridge-react";
import useHost from "../hooks/useHost";
import useShopOrigin from "../hooks/useShopOrigin";
import merge from "lodash/merge";

/**
 * Wrap the Shopify AppBridge instantiation, if the host or shopOrigin isn't available, then start the OAuth process
 *
 * @param {*} props
 * @returns Component
 */
export default function ShopifyAppBridgeProvider(props) {
  const { children, Component, pageProps, appBridgeConfig } = props;
  const shopOrigin = useShopOrigin();
  const host = useHost();

  if (
    typeof window == "undefined" ||
    !window.location ||
    !shopOrigin ||
    !host
  ) {
    return <Component {...pageProps} />;
  }

  const apiKey = ShopifyAppBridgeProvider.getInitialProps();

  const config = merge(
    {},
    {
      apiKey: apiKey,
      forceRedirect: true,
      host,
    },
    appBridgeConfig
  );

  return <Provider config={config}>{children}</Provider>;
}

ShopifyAppBridgeProvider.getInitialProps = async () => {
  const apiKey = '34bca23626cd08ecb0533c2a93952058';
  console.log("direct from process: " + process.env.SHOPIFY_API_PUBLIC_KEY);
  return { apiKey: apiKey };
}
