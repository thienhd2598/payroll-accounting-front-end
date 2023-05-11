/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'react-toastify/dist/ReactToastify.css';
// Import all the third party stuff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { ConfigProvider } from 'antd';
import { ToastContainer } from 'react-toastify';
import FontFaceObserver from 'fontfaceobserver';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
import 'antd/dist/reset.css';
// Import root app
import App from 'containers/App';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';

import { HelmetProvider } from 'react-helmet-async';

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from 'i18n';
import locale from 'antd/lib/locale/vi_VN';

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Inter', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load(null, 3000).then(() => {
  document.body.classList.add('fontLoaded');
});

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const ConnectedApp = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router history={history}>
          <ConnectedRouter history={history}>
            <HelmetProvider>
              <ConfigProvider
                locale={locale}
                theme={{
                  token: {
                    colorPrimary: '#ff5629',
                  },
                }}
              >
                <ToastContainer
                  position="top-right"
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
                <App />
              </ConfigProvider>
            </HelmetProvider>
          </ConnectedRouter>
        </Router>
      </Provider>
    </QueryClientProvider>
  )
}


const render = (messages) => {
  ReactDOM.render(<ConnectedApp messages={messages} />, MOUNT_NODE);
};

if (module.hot) {
  // Hot reloadable translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!(window).Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/de.js'),
      ]),
    )
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

export { store };

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
// if (process.env.NODE_ENV === 'production') {
//   OfflinePluginRuntime.install();
// }
