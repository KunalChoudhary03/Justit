import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import store from "./redux/Store.jsx"
createRoot(document.getElementById('root')).render(
   
   <Provider store={store}>
      <BrowserRouter>
    <App />
    </BrowserRouter>
   </Provider>
   
)
