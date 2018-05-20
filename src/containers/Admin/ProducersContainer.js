import { connect } from "react-redux";
import {
	producersFetchData,
	addProducer,
	deleteProducer,
	updateProducer,
} from "../../actions/producers";
import { withRouter } from "react-router-dom";
import Producers from "../../components/Admin/Producers";

const mapStateToProps = state => {
	return {
		producers: state.producers,
		base_url: state.base_url,
		producersIsLoading: state.producersIsLoading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchData: url => dispatch(producersFetchData(url)),
		addProducer: item => dispatch(addProducer(item)),
		deleteProducer: id => dispatch(deleteProducer(id)),
		updateProducer: (item, index) => dispatch(updateProducer(item, index)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Producers)
);
