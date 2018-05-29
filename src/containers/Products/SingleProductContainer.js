import { connect } from "react-redux";
import { productsFetchData } from "../../actions/products";
import { categoriesFetchData } from "../../actions/categories";
import { producersFetchData } from "../../actions/producers";
import { withRouter } from "react-router-dom";
import SingleProduct from "../../components/common/Products/SingleProduct";

const mapStateToProps = state => {
	return {
		products: state.products,
		categories: state.categories,
		producers: state.producers,
		base_url: state.base_url,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchProducts: url => dispatch(productsFetchData(url)),
		fetchCategories: url => dispatch(categoriesFetchData(url)),
		fetchProducers: url => dispatch(producersFetchData(url)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
);
