import { connect } from "react-redux";
import { ordersFetchData, updateOrder } from "../../actions/order";
import { withRouter } from "react-router-dom";
import Orders from "../../components/Admin/Orders";

const mapStateToProps = state => {
	return {
		orders: state.orders,
		base_url: state.base_url,
		ordersIsLoading: state.ordersIsLoading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchData: url => dispatch(ordersFetchData(url)),
		updateOrder: (item, id) => dispatch(updateOrder(item, id)),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Orders)
);
