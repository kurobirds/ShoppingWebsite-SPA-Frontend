import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
// import App from "./pages/App";
import Dashboard from "./pages/Admin/Dashboard";

import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const store = configureStore();

store.subscribe(() => {
	console.log("store changed", store.getState());
});

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Dashboard />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
