import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Register from "../components/Register";

const mapStateToProps = state => {
	return {
		base_url: state.base_url,
		isAuthenticated: state.auth.isAuthenticated,
		token: state.auth.token,
		errorMessage: state.auth.errorMessage,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		// loginUser: (url, creds) => dispatch(loginUser(url, creds)),
		// logoutUser: () => dispatch(logoutUser()),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Register)
);
