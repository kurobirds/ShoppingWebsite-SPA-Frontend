import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound";
import HomeProduct from "../pages/Products/HomeProduct";
import SingleProduct from "../pages/Products/SingleProduct";

const RouteConfig = () => (
	<React.Fragment>
		<Switch>
			<Route exact path="/" component={HomeProduct} />
			<Route exact path="/product" component={() => <h2>Yolo</h2>} />
			<Route path="/product/:id" component={SingleProduct} />
			<Route component={NotFound} />
		</Switch>
	</React.Fragment>
);

export default RouteConfig;
