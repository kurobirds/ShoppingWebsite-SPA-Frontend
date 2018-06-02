import { connect } from "react-redux";
import { productsFetchData } from "../actions/products";
import { categoriesFetchData } from "../actions/categories";
import { producersFetchData } from "../actions/producers";

import { deleteCart } from "../actions/carts";
import { logoutUser } from "../actions/auth";
import { withRouter } from "react-router-dom";
import App from "../components/App";

const mapStateToProps = state => {
	return {
		products: state.products,
		categories: state.categories,
		producers: state.producers,
		base_url: state.base_url,
		isAuthenticated: state.auth.isAuthenticated,
		token: state.auth.token,
		carts: state.carts,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchProducts: url => dispatch(productsFetchData(url)),
		fetchCategories: url => dispatch(categoriesFetchData(url)),
		fetchProducers: url => dispatch(producersFetchData(url)),
		logoutUser: () => dispatch(logoutUser()),
		deleteCart: id => dispatch(deleteCart(id)),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
