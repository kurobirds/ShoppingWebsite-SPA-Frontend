import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import NotFound from "../components/NotFound";
import Signin from "../components/Login";
import Dashboard from "../pages/Admin/Dashboard";
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
		<Link to="/signin">
			<div
				style={{
					fontSize: "16px",
				}}
			>
				Signin
			</div>
		</Link>
	</div>
);

const RouteConfig = () => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route path="/admin" component={Dashboard} />
		<Route path="/signin" component={Signin} />
		<Route component={NotFound} />
	</Switch>
);

export default RouteConfig;
