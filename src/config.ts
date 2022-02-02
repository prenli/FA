const { NODE_ENV } = process.env;

export const isDevelopment = NODE_ENV === "development";

export const API_URL = window.location.origin;
