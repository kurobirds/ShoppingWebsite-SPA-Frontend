import React, { Component } from "react";
import { Table, Icon, InputNumber } from "antd";
import { Button, notification } from "antd";
import decode from "jwt-decode";
import moment from "moment";

export default class Checkout extends Component {
	onChange = value => {
		console.log("changed", value);
	};

	render() {
		const carts = this.props.carts;
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
							max={product.Stock_Quantity}
							defaultValue={record.Select_Quantity}
							onChange={e => {
								record.Select_Quantity = e;
								record.Price =
									product.Price * record.Select_Quantity;
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
					return Number(
						product.Price * record.Select_Quantity
					).formatVND();
				},
			},
		];
		return (
			<Table
				rowKey="_id"
				dataSource={carts}
				columns={columns}
				pagination={false}
				footer={() => (
					<div
						style={{
							textAlign: "right",
							marginRight: "12%",
							fontSize: "18px",
						}}
					>
						<b style={{ marginRight: "50px" }}>Total:</b>
						{Subtotal.formatVND()}
						<br />
						<Button
							type="primary"
							style={{
								marginTop: "10px",
								width: "16%",
							}}
							onClick={() => {
								if (!this.props.isAuthenticated) {
									notification.error({
										message:
											"You not had permission to do this",
										description: "You need login first.",
										duration: 2,
									});
									return;
								}
								const decoded = decode(localStorage.token);

								const List_Product = carts.map(element => ({
									Product_Info: element._id,
									Select_Quantity: element.Select_Quantity,
								}));

								if (List_Product.length === 0) {
									notification.warning({
										message: "Nothing in your cart",
										description:
											"You need more than 1 product in your cart to checkout.",
										duration: 2,
									});
									return;
								}

								const order = {
									Order_Date: moment().unix(),
									User_Detail: decoded._id,
									List_Product,
									Price: Subtotal,
									Status: 0,
								};

								console.log(order);

								fetch(`${this.props.base_url}orders`, {
									method: "POST",
									headers: {
										"Content-Type": "application/json",
										Authorization: `Bearer ${
											localStorage.token
										}`,
									},
									body: JSON.stringify(order),
								})
									.then(response => response.json())
									.then(() => {
										notification.success({
											message: "Checkout Successfully",
											description:
												"We received your order but need time your we check it.",
										});
										this.props.cleanCart();
									})
									.catch(err => console.error(err));
							}}
						>
							CHECKOUT
						</Button>
					</div>
				)}
			/>
		);
	}
}
