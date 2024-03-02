import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '@app/App';
import { store } from '@app/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const persistor = persistStore(store)
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>
);