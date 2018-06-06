import React, { Component } from "react";
import "./Orders.css";
import { Table, Badge, Select, message } from "antd";
const Option = Select.Option;

const expandedRowRender = props => {
	const columns = [
		{
			title: "ID",
			dataIndex: "_id",
			key: "_id",
			width: "20%",
		},
		{
			title: "Name",
			dataIndex: "Name",
			key: "Name",
		},
		{
			title: "Stock",
			dataIndex: "Sell_Quantity",
			key: "Sell_Quantity",
		},
		{
			title: "Quantity",
			dataIndex: "Quantity",
			key: "Quantity",
		},
		{
			title: "Price",
			key: "Price",
			render(element) {
				const Quantity = Number(element.Quantity);
				const Price = Number(element.Price);
				const Total = (Quantity * Price).formatVND();
				return <div>{Total}</div>;
			},
		},
	];

	const data = props.ListProduct || [];

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
					title: "Order Date",
					dataIndex: "OrderDate",
					key: "OrderDate",
				},
				{
					title: "UserDetail",
					dataIndex: "UserDetail.Name",
					key: "UserDetail",
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
			/>
		);
	}
}
