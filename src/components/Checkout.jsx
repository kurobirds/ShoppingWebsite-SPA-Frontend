import React, { Component } from "react";
import { Table, Icon, InputNumber } from "antd";
export default class Checkout extends Component {
	onChange = value => {
		console.log("changed", value);
	};

	render() {
		const carts = this.props.carts;
		carts.map(element => (element.key = element._id));
		const Subtotal = carts.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.Price;
		}, 0);

		const columns = [
			{
				key: "action",
				width: "1%",
				render: (text, record) => (
					<Icon
						style={{
							cursor: "pointer",
							fontSize: 16,
							color: "red",
						}}
						type="close"
						onClick={() => {
							this.props.deleteCart(record._id);
						}}
					/>
				),
			},
			{
				dataIndex: "Image",
				key: "Image",
				width: "10%",
				render: link => (
					<img src={link} alt="source" height="100" width="100" />
				),
			},
			{
				title: "Name",
				dataIndex: "Name",
				key: "Name",
			},
			{
				title: "Price",
				key: "Price",
				render: (text, record) => {
					const product =
						this.props.products.find(
							element => element._id === record._id
						) || {};
					return Number(product.Price).formatVND();
				},
			},
			{
				title: "Quantity",
				key: "Quantity",
				render: (text, record) => {
					const product =
						this.props.products.find(
							element => element._id === record._id
						) || {};
					return (
						<InputNumber
							min={1}
							max={product.Quantity}
							defaultValue={record.quantity}
							onChange={e => {
								record.quantity = e;
								record.Price = product.Price * record.quantity;
								this.props.updateCart(record, record._id);
							}}
						/>
					);
				},
			},
			{
				title: "Total",
				key: "Total",
				render: (text, record) => {
					const product =
						this.props.products.find(
							element => element._id === record._id
						) || {};
					return Number(product.Price * record.quantity).formatVND();
				},
			},
		];
		return (
			<Table
				dataSource={carts}
				columns={columns}
				pagination={false}
				footer={() => {
					return (
						<React.Fragment>
							<span
								style={{ float: "right", marginRight: "12%" }}
							>
								<b style={{ marginRight: "50px" }}>Subtotal:</b>
								{Subtotal.formatVND()}
							</span>
						</React.Fragment>
					);
				}}
			/>
		);
	}
}
