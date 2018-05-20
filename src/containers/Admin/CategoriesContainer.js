import { connect } from "react-redux";
import {
	categoriesFetchData,
	addCategory,
	deleteCategory,
	updateCategory,
} from "../../actions/categories";
import { withRouter } from "react-router-dom";
import Categories from "../../components/Admin/Categories";

const mapStateToProps = state => {
	return {
		categories: state.categories,
		base_url: state.base_url,
		categoriesIsLoading: state.categoriesIsLoading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchData: url => dispatch(categoriesFetchData(url)),
		addCategory: item => dispatch(addCategory(item)),
		deleteCategory: id => dispatch(deleteCategory(id)),
		updateCategory: (item, index) => dispatch(updateCategory(item, index)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Categories)
);
