import React from "react";
import { Modal, Form } from "antd";
import PropTypes from "prop-types";

import FormItem from "./Form";
import FormProducts from "./Form/formProducts";
import FormCategories from "./Form/formCategories";
import FormProducers from "./Form/formProducers";
import FormUsers from "./Form/formUsers";

class ModalComponent extends React.Component {
	render() {
		const type = this.props.type;
		const nameModal =
			type === 1
				? "Order"
				: type === 2
					? "Product"
					: type === 3
						? "Category"
						: type === 4
							? "Producer"
							: "User";
		const { visible, onOk, onCancel, form } = this.props;
		const { getFieldDecorator } = form;
		return (
			<Modal
				title={`${this.props.titleModal} ${nameModal}`}
				visible={visible}
				onOk={onOk}
				onCancel={onCancel}
				okText={this.props.titleModal}
			>
				{type === 1 ? (
					<FormItem formField={{ getFieldDecorator }} />
				) : type === 2 ? (
					<FormProducts
						formField={{ getFieldDecorator }}
						listCategory={this.props.listCategory}
						listProducer={this.props.listProducer}
					/>
				) : type === 3 ? (
					<FormCategories formField={{ getFieldDecorator }} />
				) : type === 4 ? (
					<FormProducers formField={{ getFieldDecorator }} />
				) : (
					<FormUsers formField={{ getFieldDecorator }} />
				)}
			</Modal>
		);
	}
}

export default Form.create()(ModalComponent);

ModalComponent.propTypes = {
	visible: PropTypes.bool,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
	form: PropTypes.object,
	type: PropTypes.number,
	titleModal: PropTypes.string,
};
