import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/_redux/store";

import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "@/../App";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <>
        <StrictMode>
            <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                    <ReduxProvider store={store}>
                        <App />
                    </ReduxProvider>
                    <ReactQueryDevtools initialIsOpen />
                </QueryClientProvider>
            </HelmetProvider>
        </StrictMode>
    </>
);
