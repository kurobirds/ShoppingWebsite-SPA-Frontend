import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { logoutUser } from "../../actions/auth";
import { productsFetchData } from "../../actions/products";
import { categoriesFetchData } from "../../actions/categories";
import { producersFetchData } from "../../actions/producers";
import { ordersFetchData } from "../../actions/order";

import DashboardChart from "../../components/Admin/DashboardChart";

const mapStateToProps = state => {
	return {
		base_url: state.base_url,
		isAuthenticated: state.auth.isAuthenticated,
		token: state.auth.token,
		errorMessage: state.auth.errorMessage,
		products: state.products,
		categories: state.categories,
		producers: state.producers,
		orders: state.orders,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logoutUser: () => dispatch(logoutUser()),
		fetchProducts: url => dispatch(productsFetchData(url)),
		fetchCategories: url => dispatch(categoriesFetchData(url)),
		fetchProducers: url => dispatch(producersFetchData(url)),
		fetchOrders: url => dispatch(ordersFetchData(url)),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(DashboardChart)
);
