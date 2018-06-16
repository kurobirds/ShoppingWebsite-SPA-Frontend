import React, { Component } from "react";

import { Row, Col, Divider } from "antd";
import { Pie } from "ant-design-pro/lib/Charts";

export default class Users extends Component {
	componentDidMount() {
		this.props.fetchProducts(`${this.props.base_url}products`);
		this.props.fetchCategories(`${this.props.base_url}categories`);
		this.props.fetchProducers(`${this.props.base_url}producers`);
	}

	render() {
		const products = this.props.products;
		if (!products) {
			return null;
		}
		let categorySalesHelper = {};
		let categorySales = products
			.map(element => ({
				y: element.Sold_Quantity,
				x: element.Categories_Detail.Name,
			}))
			.reduce((r, e) => {
				if (!categorySalesHelper[e.x]) {
					categorySalesHelper[e.x] = e;
					r.push(categorySalesHelper[e.x]);
				} else {
					categorySalesHelper[e.x].y += e.y;
				}
				return r;
			}, []);

		let producerSalesHelper = {};
		let producerSales = products
			.map(element => ({
				y: element.Sold_Quantity,
				x: element.Producer_Detail.Name,
			}))
			.reduce((r, e) => {
				if (!producerSalesHelper[e.x]) {
					producerSalesHelper[e.x] = e;
					r.push(producerSalesHelper[e.x]);
				} else {
					producerSalesHelper[e.x].y += e.y;
				}
				return r;
			}, []);

		const top10Product = products
			.sort((obj1, obj2) => obj1.Sold_Quantity - obj2.Sold_Quantity)
			.reverse()
			.slice(0, 10);

		// TODO: make chart top 10 product sales

		return (
			<Row>
				<Col span={11}>
					<b>Category Sales</b>
					<Pie
						hasLegend
						title="Category Sales"
						data={categorySales}
						height={248}
					/>
				</Col>
				<Col span={1}>
					<Divider
						type="vertical"
						style={{
							height: "248px",
						}}
					/>
				</Col>
				<Col span={11}>
					<b>Producer Sales</b>
					<Pie
						hasLegend
						title="Producer Sales"
						data={producerSales}
						height={248}
					/>
				</Col>
			</Row>
		);
	}
}
