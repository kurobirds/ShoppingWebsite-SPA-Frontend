import { connect } from "react-redux";
import { categoriesFetchData } from "../actions/categories";

import Dashboard from "../components/Dashboard";

const mapStateToProps = state => {
	return {
		categories: state.categories,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchData: url => dispatch(categoriesFetchData(url)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
