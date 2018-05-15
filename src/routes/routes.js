import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound";
import Categories from "../pages/Admin/Categories";
import Users from "../pages/Admin/Users";
import Products from "../pages/Admin/Products";
import Producers from "../pages/Admin/Producers";
// Component
const Home = () => (
	<div>
		<h2>Home</h2>
	</div>
);
const Dashboard = () => (
	<div>
		<h2>Dashboard</h2>
	</div>
);

const RouterURL = () => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route exact path="/admin" component={Dashboard} />
		<Route exact path="/admin/categories" component={Categories} />
		<Route exact path="/admin/products" component={Products} />
		<Route exact path="/admin/producers" component={Producers} />
		<Route exact path="/admin/users" component={Users} />
		<Route component={NotFound} />
	</Switch>
);

export default RouterURL;
