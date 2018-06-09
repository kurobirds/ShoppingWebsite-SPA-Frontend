import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound";
import Categories from "../pages/Admin/Categories";
import Users from "../pages/Admin/Users";
import Products from "../pages/Admin/Products";
import Producers from "../pages/Admin/Producers";
import Orders from "../pages/Admin/Orders";
import DashboardChart from "../pages/Admin/DashboardChart";

const RouteConfig = () => (
	<Switch>
		<Route exact path="/admin" component={DashboardChart} />
		<Route path="/admin/categories" component={Categories} />
		<Route path="/admin/products" component={Products} />
		<Route path="/admin/producers" component={Producers} />
		<Route path="/admin/users" component={Users} />
		<Route path="/admin/orders" component={Orders} />
		<Route component={NotFound} />
	</Switch>
);

export default RouteConfig;
