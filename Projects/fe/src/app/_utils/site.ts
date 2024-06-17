const prodServerUrl = "https://jeheecheon.azurewebsites.net";
const localServerUrl = "https://localhost:7130";

export const serverUrl =
    process.env.NODE_ENV === "development" ? localServerUrl : prodServerUrl;

const prodClientUrl = "https://jeheecheon.com";
const localClientUrl = "https://localhost:5173";

export const clientUrl = 
    process.env.NODE_ENV === "development" ? localClientUrl : prodClientUrl;