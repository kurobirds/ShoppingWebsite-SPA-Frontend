import { connect } from "react-redux";
import {
	usersFetchData,
	addUser,
	deleteUser,
	updateUser,
} from "../../actions/users";
import { withRouter } from "react-router-dom";
import Users from "../../components/Admin/Users";

const mapStateToProps = state => {
	return {
		users: state.users,
		endpoint: state.endpoint,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchData: url => dispatch(usersFetchData(url)),
		addUser: item => dispatch(addUser(item)),
		deleteUser: id => dispatch(deleteUser(id)),
		updateUser: (item, index) => dispatch(updateUser(item, index)),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
