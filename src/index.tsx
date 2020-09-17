import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom';

import { ScrollToTop } from './ScrollToTop';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './themes/theme';

import { StateProvider } from './store/StateProvider';
import reducer, { initialState } from './store/reducer';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <ScrollToTop>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </ScrollToTop>
      </Router>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
