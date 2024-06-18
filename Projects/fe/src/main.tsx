import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/_redux/store";

import App from "@/../App";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <>
        {/* <React.StrictMode> */}
        <HelmetProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </HelmetProvider>
        {/* </React.StrictMode> */}
    </>
);
