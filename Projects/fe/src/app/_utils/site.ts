const prodServerUrl = "https://jeheecheon.azurewebsites.net/";
const localServerUrl = "https://localhost:7130";

export const serverUrl =
    process.env.NODE_ENV === "development" ? localServerUrl : prodServerUrl;
