import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import Route from "./routes/routes";

import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

import { SearchkitManager, SearchkitProvider } from "searchkit";

require("./helpers");

const store = configureStore();

store.subscribe(() => {
	console.log("store changed", store.getState());
});

const searchkit = new SearchkitManager(
	"https://thorin-us-east-1.searchly.com/products/",
	{
		basicAuth: "site:15535653c413eb3e183d85f478a93b2a",
	}
);

ReactDOM.render(
	<Provider store={store}>
		<SearchkitProvider searchkit={searchkit}>
			<BrowserRouter>
				<Route />
			</BrowserRouter>
		</SearchkitProvider>
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
