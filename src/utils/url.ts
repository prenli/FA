export const addProtocolToUrl = (url: string) =>
  url.includes("https://") || url.includes("http://") ? url : "https://" + url;
