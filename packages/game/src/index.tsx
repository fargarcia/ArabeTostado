import { Provider } from "react-redux";
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import ReactDOM from "react-dom/client";
import './index.css';
import App from './app/App';
import configureStore from "./store/store";

const store = configureStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </Provider>
);
