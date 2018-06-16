import React, { Component } from "react";
import "./Orders.css";
import { Table, Tag } from "antd";

const expandedRowRender = props => {
	const columns = [
		{
			title: "Product ID",
			dataIndex: "Product_Info._id",
			key: "_id",
			width: "30%",
			align: "center",
		},
		{
			title: "Name",
			dataIndex: "Product_Info.Name",
			key: "Name",
			align: "center",
		},
		{
			title: "Selected",
			dataIndex: "Select_Quantity",
			key: "Select_Quantity",
			align: "center",
		},
		{
			title: "Price",
			key: "Price",
			align: "center",
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
					title: "Order ID",
					dataIndex: "_id",
					key: "_id",
					width: "30%",
					align: "center",
				},
				{
					title: "Order Date",
					dataIndex: "Order_Date",
					key: "Order_Date",
					width: "20%",
					align: "center",
				},
				{
					title: "Price",
					dataIndex: "Price",
					key: "Price",
					width: "20%",
					align: "center",
				},
				{
					title: "Status",
					key: "Status",
					align: "center",
					render: element => {
						let color, text;
						switch (element.Status) {
						case 1:
							color = "#1DA57A";
							text = "Shipped";
							break;

						case 2:
							color = "#108ee9";
							text = "Processing";
							break;

						default:
							color = "#f5222d";
							text = "On Hold";
							break;
						}
						return (
							<Tag
								style={{
									margin: "0px",
									fontSize: "14px",
									cursor: "default",
								}}
								color={color}
							>
								{text}
							</Tag>
						);
					},
				},
			],
		};
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
