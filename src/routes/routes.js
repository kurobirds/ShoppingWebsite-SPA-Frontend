import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound";
import Dashboard from "../pages/Admin/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import App from "../pages/App";
import SingleProduct from "../pages/SingleProduct";

const RouteConfig = () => (
	<Switch>
		<Route exact path="/" component={App} />
		<Route path="/admin" component={Dashboard} />
		<Route path="/sign-in" component={Login} />
		<Route path="/sign-up" component={Register} />

		<Route path="/product/:id" component={SingleProduct} />
		<Route component={NotFound} />
	</Switch>
);

export default RouteConfig;
