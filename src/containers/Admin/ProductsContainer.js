import { connect } from "react-redux";
import {
	productsFetchData,
	addProduct,
	deleteProduct,
	updateProduct,
} from "../../actions/products";
import { categoriesFetchData } from "../../actions/categories";
import { producersFetchData } from "../../actions/producers";
import { withRouter } from "react-router-dom";
import Products from "../../components/Admin/Products";

const mapStateToProps = state => {
	return {
		products: state.products,
		categories: state.categories,
		producers: state.producers,
		base_url: state.base_url,
		productsIsLoading: state.productsIsLoading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchData: url => dispatch(productsFetchData(url)),
		fetchCategories: url => dispatch(categoriesFetchData(url)),
		fetchProducers: url => dispatch(producersFetchData(url)),
		addProduct: item => dispatch(addProduct(item)),
		deleteProduct: id => dispatch(deleteProduct(id)),
		updateProduct: (item, index) => dispatch(updateProduct(item, index)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Products)
);
