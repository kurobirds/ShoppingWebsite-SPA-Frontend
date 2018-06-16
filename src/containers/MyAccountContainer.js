import { connect } from "react-redux";

import { deleteCart } from "../actions/carts";
import { logoutUser } from "../actions/auth";
import { withRouter } from "react-router-dom";

import MyAccount from "../components/MyAccount";

const mapStateToProps = state => {
	return {
		base_url: state.base_url,
		isAuthenticated: state.auth.isAuthenticated,
		token: state.auth.token,
		carts: state.carts,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logoutUser: () => dispatch(logoutUser()),
		deleteCart: id => dispatch(deleteCart(id)),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(MyAccount)
);
