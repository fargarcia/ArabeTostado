import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './app/App';
import configureStore from "./store/store";

const store = configureStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
