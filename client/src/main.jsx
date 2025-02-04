import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reducer from './redux/rootReducer.js';

const store = createStore(reducer);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  </Provider>
);
