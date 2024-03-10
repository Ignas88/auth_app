import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '@app/App';
import { store, persistor } from '@app/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>
);