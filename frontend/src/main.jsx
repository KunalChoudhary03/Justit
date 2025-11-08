import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import store, { persistor } from "./redux/Store.jsx"
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
   
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </PersistGate>
   </Provider>
   
)
