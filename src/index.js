import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  DefaultOptions,
} from "@apollo/client";
import "./styles/Index.css";
// const client = new ApolloClient({
//   uri: "http://localhost:4000/",
//   cache: new InMemoryCache(),
// });
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
