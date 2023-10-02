import React from "react";
import { createRoot } from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/reset.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { fetchPublicKey } from "./store/keys/keysOperations";

(async () => {
  const success = await fetchPublicKey();
  if (success) {
    console.log("Successfully fetched public key");
  } else {
    console.error("Failed to fetch public key");
  }
})();

const rootElement = document.getElementById("root");
createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
