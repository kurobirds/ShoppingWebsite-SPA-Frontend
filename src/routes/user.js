import React from "react";
import { Route, Switch } from "react-router-dom";

const Login = () => {
	return <div>Login</div>;
};

const Register = () => {
	return <div>Register</div>;
};

const RouteConfig = () => (
	<Switch>
		<Route exact path="/login" component={Login} />
		<Route exact path="/register" component={Register} />
	</Switch>
);

export default RouteConfig;
