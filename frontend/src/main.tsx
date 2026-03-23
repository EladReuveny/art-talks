import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import SearchContextProvider from "./context/SearchContextProvider.tsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SearchContextProvider>
        <Router>
          <ToastContainer
            autoClose={4000}
            theme="colored"
            position="bottom-right"
          />
          <App />
        </Router>
      </SearchContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
