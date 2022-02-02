import { WatchQueryFetchPolicy } from "@apollo/client";

let wasApiHookCalledMap: Record<string, boolean> = {};

interface FetchPolicyOptions {
  fetchPolicy: WatchQueryFetchPolicy;
  onCompleted: (data: unknown) => void;
  pollInterval: number;
}

/*
App persists its Apollo Client cache to localStorage
To have fresh data we get the data from api on every first hook call after app refresh
wasApiHookCalledMap keeping information if specified hook was rendered in current run
if hook was rendered we set fetchPolicy to "cache-only" if not we set "cache-and-network" (displays cached data but fetch current from api)
Apollo Client provides nextFetchPolicy, but it is reset to fetchPolicy after render of component where hook was used
Also we are pooling data from api on every pollInterval value milliseconds
 */
export const getFetchPolicyOptions = (hookKey: string): FetchPolicyOptions => ({
  fetchPolicy:
    !wasApiHookCalledMap[hookKey] && window.navigator.onLine
      ? "cache-and-network"
      : "cache-only",
  onCompleted: (data: unknown) => {
    wasApiHookCalledMap = {
      ...wasApiHookCalledMap,
      [hookKey]: true,
    };
  },
  pollInterval: 60 * 60 * 1000, // 1 h
});
