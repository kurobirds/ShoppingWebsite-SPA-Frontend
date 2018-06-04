import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../components/NotFound";
import HomeProduct from "../pages/Products/HomeProduct";
import SingleProduct from "../pages/Products/SingleProduct";
import Checkout from "../pages/Checkout";

const RouteConfig = () => (
	<React.Fragment>
		<Switch>
			<Route exact path="/" component={HomeProduct} />
			<Route exact path="/product" component={HomeProduct} />
			<Route path="/product/:id" component={SingleProduct} />
			<Route path="/checkout" component={Checkout} />
			<Route component={NotFound} />
		</Switch>
	</React.Fragment>
);

export default RouteConfig;
