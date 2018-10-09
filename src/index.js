import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { store, history } from './store/store';
import { ConnectedRouter } from 'react-router-redux';

const RenderApp = () => (
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<RenderApp />, document.getElementById('root'));
registerServiceWorker();
