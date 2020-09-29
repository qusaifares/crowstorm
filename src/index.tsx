import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './themes/theme';

import { StateProvider } from './store/StateProvider';
import reducer, { initialState } from './store/reducer';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY as string);

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </ThemeProvider>
      </Router>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
