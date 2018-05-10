import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound";
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
		<Route exact path="/dashboard" component={Dashboard} />
		<Route component={NotFound} />
	</Switch>
);

export default RouterURL;
