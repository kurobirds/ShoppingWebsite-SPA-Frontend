import { connect } from "react-redux";

import { updateCart, deleteCart, cleanCart } from "../actions/carts";
import { withRouter } from "react-router-dom";
import Checkout from "../components/Checkout";

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
		deleteCart: id => dispatch(deleteCart(id)),
		updateCart: (item, index) => dispatch(updateCart(item, index)),
		cleanCart: () => dispatch(cleanCart()),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Checkout)
);
