/*eslint-env browser*/
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reblog.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './Store';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { CookiesProvider } from 'react-cookie';

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('debug', 'reblog19:*');
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://127.0.0.1:4000/graphql',
  credentials: 'same-origin'
});

const rootElement = document.getElementById('root');

ReactDOM.render(
  <CookiesProvider>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </CookiesProvider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
