/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';
import LoginPage from 'containers/LoginPage';
import LogoutPage from 'containers/LogoutPage';

// Import PrivateRoute
import PrivateRoute from 'containers/PrivateRoute';

// Load the favicon, the manifest.json file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!images/icon-72x72.png';
import '!file-loader?name=[name].[ext]!images/icon-96x96.png';
import '!file-loader?name=[name].[ext]!images/icon-128x128.png';
import '!file-loader?name=[name].[ext]!images/icon-144x144.png';
import '!file-loader?name=[name].[ext]!images/icon-152x152.png';
import '!file-loader?name=[name].[ext]!images/icon-192x192.png';
import '!file-loader?name=[name].[ext]!images/icon-384x384.png';
import '!file-loader?name=[name].[ext]!images/icon-512x512.png';
import '!file-loader?name=[name].[ext]!manifest.json';
/* eslint-enable import/no-unresolved, import/extensions */

// Import Router
import { Route, Switch } from 'react-router-dom';

// Import Modal
import ModalController from 'containers/ModalController';
import LoadingController from 'containers/LoadingController';

import configureStore from './configureStore';

// Import CSS reset and Global Styles
import './global-styles.scss';

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <span>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <PrivateRoute component={App} />
          </Switch>
          <ModalController />
          <LoadingController />
        </span>
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
