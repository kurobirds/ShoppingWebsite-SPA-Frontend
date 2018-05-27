import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import Route from "./routes/routes";

import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const store = configureStore();

store.subscribe(() => {
	console.log("store changed", store.getState());
});

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Route />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
