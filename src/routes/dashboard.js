import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound";
import Categories from "../pages/Admin/Categories";
import Users from "../pages/Admin/Users";
import Products from "../pages/Admin/Products";
import Producers from "../pages/Admin/Producers";
// Component
const Dashboard = () => (
	<div>
		<h2>Dashboard</h2>
	</div>
);

const RouteConfig = () => (
	<Switch>
		<Route exact path="/admin" component={Dashboard} />
		<Route path="/admin/categories" component={Categories} />
		<Route path="/admin/products" component={Products} />
		<Route path="/admin/producers" component={Producers} />
		<Route path="/admin/users" component={Users} />
		<Route component={NotFound} />
	</Switch>
);

export default RouteConfig;
