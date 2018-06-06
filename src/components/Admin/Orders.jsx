import React, { Component } from "react";
import "./Orders.css";
import { Table, Badge, Select, message } from "antd";
const Option = Select.Option;

const expandedRowRender = props => {
	console.log(props);
	const columns = [
		{
			title: "ID",
			dataIndex: "Product_Info._id",
			key: "_id",
			width: "20%",
		},
		{
			title: "Name",
			dataIndex: "Product_Info.Name",
			key: "Name",
		},
		{
			title: "Stock_Quantity",
			dataIndex: "Product_Info.Stock_Quantity",
			key: "Stock_Quantity",
		},
		{
			title: "Select_Quantity",
			dataIndex: "Select_Quantity",
			key: "Select_Quantity",
		},
		{
			title: "Price",
			key: "Price",
			render(element) {
				const Select_Quantity = Number(element.Select_Quantity);
				const Price = Number(element.Product_Info.Price);
				const Total = (Select_Quantity * Price).formatVND();
				return <div>{Total}</div>;
			},
		},
	];

	const data = props.List_Product || [];

	return (
		<Table
			rowKey="_id"
			columns={columns}
			dataSource={data}
			pagination={false}
		/>
	);
};

export default class Orders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: "ID",
					dataIndex: "_id",
					key: "_id",
					width: "20%",
				},
				{
					title: "Order_Date",
					dataIndex: "Order_Date",
					key: "Order_Date",
				},
				{
					title: "User_Detail",
					dataIndex: "User_Detail.Name",
					key: "User_Detail",
				},
				{
					title: "Price",
					dataIndex: "Price",
					key: "Price",
				},
				{
					title: "Status",
					key: "Status",
					render: element => {
						return (
							<span>
								<Select
									style={{ width: 140 }}
									defaultValue={element.Status}
									onChange={value => {
										fetch(
											`${this.props.base_url}orders/${
												element._id
											}`,
											{
												method: "PUT",
												headers: {
													"Content-Type":
														"application/json",
													Authorization: `Bearer ${
														localStorage.token
													}`,
												},
												body: JSON.stringify({
													Status: value,
												}),
											}
										)
											.then(res => res.json())
											.then(() => {
												this.props.updateOrder(
													element,
													element._id
												);
												message.success(
													"Update Successfully"
												);
											})
											.catch(err =>
												message.error(err.message)
											);
									}}
								>
									<Option value={1}>
										<Badge status="success" />Success
									</Option>
									<Option value={2}>
										<Badge status="error" />Error
									</Option>
									<Option value={0}>
										<Badge status="default" />Default
									</Option>
									<Option value={3}>
										<Badge status="processing" />Processing
									</Option>
									<Option value={4}>
										<Badge status="warning" />Warning
									</Option>
								</Select>
							</span>
						);
					},
				},
			],
		};
	}

	componentDidMount() {
		this.props.fetchData(`${this.props.base_url}orders`);
	}
	render() {
		return (
			<Table
				rowKey="_id"
				className="components-table-nested"
				dataSource={this.props.orders}
				columns={this.state.columns}
				expandedRowRender={element => expandedRowRender(element)}
				loading={this.props.ordersIsLoading}
			/>
		);
	}
}
