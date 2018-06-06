import { connect } from "react-redux";
import { productsFetchData } from "../../actions/products";
import { categoriesFetchData } from "../../actions/categories";
import { producersFetchData } from "../../actions/producers";
import { addCart, updateCart, deleteCart } from "../../actions/carts";
import { withRouter } from "react-router-dom";
import HomeProduct from "../../components/common/Products/HomeProduct";

const mapStateToProps = state => {
	return {
		products: state.products,
		categories: state.categories,
		producers: state.producers,
		base_url: state.base_url,
		carts: state.carts,
		productsIsLoading: state.productsIsLoading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchProducts: url => dispatch(productsFetchData(url)),
		fetchCategories: url => dispatch(categoriesFetchData(url)),
		fetchProducers: url => dispatch(producersFetchData(url)),
		addCart: (item, quantity) => dispatch(addCart(item, quantity)),
		deleteCart: id => dispatch(deleteCart(id)),
		updateCart: (item, index) => dispatch(updateCart(item, index)),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(HomeProduct)
);
