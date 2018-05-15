import { connect } from "react-redux";
import {
	productsFetchData,
	addProduct,
	deleteProduct,
	updateProduct,
} from "../../actions/products";
import { withRouter } from "react-router-dom";
import Products from "../../components/Admin/Products";

const mapStateToProps = state => {
	return {
		products: state.products,
		endpoint: state.endpoint,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchData: url => dispatch(productsFetchData(url)),
		addProduct: item => dispatch(addProduct(item)),
		deleteProduct: id => dispatch(deleteProduct(id)),
		updateProduct: (item, index) => dispatch(updateProduct(item, index)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Products)
);
