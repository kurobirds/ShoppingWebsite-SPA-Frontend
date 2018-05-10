import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
// import App from "./pages/App";
import Dashboard from "./components/Dashboard";

ReactDOM.render(
	<BrowserRouter>
		<Dashboard />
	</BrowserRouter>,
	document.getElementById("root")
);
registerServiceWorker();
