import React, { Component } from "react";

import { Row, Col, Divider } from "antd";
import { Pie } from "ant-design-pro/lib/Charts";

import { Chart, Axis, Tooltip, Geom, Coord } from "bizcharts";
import { View } from "@antv/data-set";

export default class Users extends Component {
	componentDidMount() {
		this.props.fetchProducts(`${this.props.base_url}products`);
		this.props.fetchCategories(`${this.props.base_url}categories`);
		this.props.fetchProducers(`${this.props.base_url}producers`);
	}

	initCategorySales = products => {
		let categorySalesHelper = {};
		return products
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
	};

	initProducerSales = products => {
		let producerSalesHelper = {};
		return products
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
	};

	initProductSales = products => {
		return products
			.sort((obj1, obj2) => obj1.Sold_Quantity - obj2.Sold_Quantity)
			.reverse()
			.slice(0, 10)
			.map(elem => ({
				Sold_Quantity: elem.Sold_Quantity,
				Name: elem.Name,
			}));
	};

	render() {
		const products = this.props.products;
		if (!products) {
			return null;
		}

		let categorySales = this.initCategorySales(products);

		let producerSales = this.initProducerSales(products);

		const top10Product = this.initProductSales(products);

		const dv = new View();
		dv.source(top10Product).transform({
			type: "sort",
			callback(a, b) {
				return a.Sold_Quantity - b.Sold_Quantity > 0;
			},
		});
		return (
			<React.Fragment>
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
				<Divider style={{ margin: "5% 0px" }} />
				<Row>
					<Col span={24}>
						<b>Product Sales</b>
						<Chart
							padding="auto"
							height={400}
							data={dv}
							forceFit={true}
						>
							<Coord transpose />
							<Axis name="Name" />
							<Axis name="Sold_Quantity" />
							<Tooltip />
							<Geom
								type="interval"
								color="Sold_Quantity"
								position="Name*Sold_Quantity"
							/>
						</Chart>
					</Col>
				</Row>

				<Divider style={{ margin: "5% 0px" }} />

				<Row>
					<Col span={24}>
						<b>Product Sales</b>
						asd
					</Col>
				</Row>
			</React.Fragment>
		);
	}
}
