import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/_redux/store";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

import router from "@/_utils/router";
import PageLoadingSpinner from "@/_components/spinner/PageLoadingSpinner";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            retryDelay: 1000,
            staleTime: 1000 * 60 * 60,
            gcTime: 0,
        },
    },
});

const persister = createSyncStoragePersister({
    storage: window.localStorage,
});

const App = () => {
    return (
        <HelmetProvider>
            <PersistQueryClientProvider
                client={queryClient}
                persistOptions={{ persister, maxAge: Infinity }}
            >
                <ReduxProvider store={store}>
                    <RouterProvider
                        router={router}
                        fallbackElement={<PageLoadingSpinner />}
                    />
                </ReduxProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </PersistQueryClientProvider>
        </HelmetProvider>
    );
};

export default App;
