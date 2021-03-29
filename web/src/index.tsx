import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";

import { Routes } from './Routes';

const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "http://127.0.0.1:3001/graphql"
});

ReactDOM.render(
  <React.StrictMode>
	  <ApolloProvider client={client}>
    	<Routes />
	  </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);