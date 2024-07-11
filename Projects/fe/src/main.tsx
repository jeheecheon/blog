import ReactDOM from "react-dom/client";
// import { StrictMode } from "react";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/_redux/store";

import { HelmetProvider } from "react-helmet-async";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

import App from "@/../App";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 60 * 24,
            gcTime: 1000 * 60 * 60 * 12,
            retry: 2
        },
    },
});

const persister = createSyncStoragePersister({
    storage: window.localStorage,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <>
        {/* <StrictMode> */}
            <HelmetProvider>
                <PersistQueryClientProvider
                    client={queryClient}
                    persistOptions={{ persister, maxAge: Infinity }}
                >
                    <ReduxProvider store={store}>
                        <App />
                    </ReduxProvider>
                    <ReactQueryDevtools initialIsOpen={true} />
                </PersistQueryClientProvider>
            </HelmetProvider>
        {/* </StrictMode> */}
    </>
);
