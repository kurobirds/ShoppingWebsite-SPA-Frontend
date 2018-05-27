import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import NotFound from "../components/NotFound";
import Dashboard from "../pages/Admin/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import App from "../pages/App";

// Component
const Home = () => (
	<div>
		<Link to="/admin">
			<div
				style={{
					fontSize: "16px",
				}}
			>
				Admin
			</div>
		</Link>
		<Link to="/sign-in">
			<div
				style={{
					fontSize: "16px",
				}}
			>
				Sign-in
			</div>
		</Link>
		<Link to="/sign-up">
			<div
				style={{
					fontSize: "16px",
				}}
			>
				Sign-up
			</div>
		</Link>
	</div>
);

const RouteConfig = () => (
	<Switch>
		<Route exact path="/" component={App} />
		<Route path="/admin" component={Dashboard} />
		<Route path="/sign-in" component={Login} />
		<Route path="/sign-up" component={Register} />
		<Route component={NotFound} />
	</Switch>
);

export default RouteConfig;
