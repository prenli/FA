const { API_URL: ENV_API_URL, NODE_ENV } = process.env;

export const isDevelopment = NODE_ENV === "development";

export const API_URL = isDevelopment ? window.location.origin : ENV_API_URL;
