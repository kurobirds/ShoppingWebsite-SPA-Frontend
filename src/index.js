import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import Route from "./routes/routes";

import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

import { ReactiveBase } from "@appbaseio/reactivesearch";

require("./helpers");

const store = configureStore();

store.subscribe(() => {
	console.log("store changed", store.getState());
});

ReactDOM.render(
	<Provider store={store}>
		<ReactiveBase
			app="products"
			url="https://site:15535653c413eb3e183d85f478a93b2a@thorin-us-east-1.searchly.com"
			theme={{
				colors: {
					primaryColor: "#1DA57A",
				},
				component: {
					padding: 10,
				},
			}}
		>
			<BrowserRouter>
				<Route />
			</BrowserRouter>
		</ReactiveBase>
	</Provider>,
	document.getElementById("root")
);

registerServiceWorker();
