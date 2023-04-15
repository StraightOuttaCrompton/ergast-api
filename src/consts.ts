export const API_PORT = 3000;
export const DEFAULT_LIMIT = 30;
export const DEFAULT_OFFSET = 0;

export const SITE_TITLE = "Ergast API";
export const SITE_DESCRIPTION =
    "The Ergast API provides a historical record of motor racing data for non-commercial purposes. The API provides data for the Formula One series, from the beginning of the world championships in 1950.";
export const API_VERSION = "1.0";

export const isProduction = process.env.NODE_ENV === "production";
export const isServerless = process.env.DEPLOYMENT_ENV === "serverless";
