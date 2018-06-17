import React, { Component } from "react";
import moment from "moment";

import { Pie } from "ant-design-pro/lib/Charts";
import { Row, Col, Divider, DatePicker } from "antd";
import { Chart, Axis, Tooltip, Geom, Coord } from "bizcharts";
import DataSet from "@antv/data-set";
const DataView = DataSet.View;

const { RangePicker } = DatePicker;

const fetchSales = async (url, callback) => {
	const response = await fetch(url);
	const json = await response.json();

	callback(json);
};

export default class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categorySales: [],
			producerSales: [],
			top10ProductSales: [],
			orderDateFilter: [],
		};
	}
	componentDidMount() {
		this.props.fetchProducts(`${this.props.base_url}products`);
		this.props.fetchCategories(`${this.props.base_url}categories`);
		this.props.fetchProducers(`${this.props.base_url}producers`);
		this.props.fetchOrders(`${this.props.base_url}orders`);

		const categorySalesURL = `${this.props.base_url}products/CategorySales`;
		const producerSalesURL = `${this.props.base_url}products/ProducerSales`;
		const top10ProductSalesURL = `${
			this.props.base_url
		}products/Top10ProductSales`;
		const orderDateFilterURL = `${
			this.props.base_url
		}orders/OrderDateFilter/0/${moment().unix()}`;

		const initCategorySales = json => {
			const data = json.map(elem => ({
				x: elem.Name,
				y: elem.sumQuantity,
			}));
			this.setState({ categorySales: data });
		};

		const initProducerSales = json => {
			const data = json.map(elem => ({
				x: elem.Name,
				y: elem.sumQuantity,
			}));
			this.setState({ producerSales: data });
		};

		const initTop10ProductSales = data => {
			this.setState({ top10ProductSales: data });
		};

		fetchSales(categorySalesURL, initCategorySales);
		fetchSales(producerSalesURL, initProducerSales);
		fetchSales(top10ProductSalesURL, initTop10ProductSales);
		fetchSales(orderDateFilterURL, this.initOrderDateFilter);
	}

	initOrderDateFilter = data => {
		data.forEach(element => {
			element.Order_Date = moment
				.unix(element.Order_Date)
				.format("YYYY-MM-DD HH:mm:ss");
		});
		this.setState({ orderDateFilter: data });
	};

	onChange = (_, dateString) => {
		const dateRange = dateString.map(elem => moment(elem).unix());

		const startDate = dateRange[0],
			endDate = dateRange[1];

		const orderDateFilterURL = `${
			this.props.base_url
		}orders/OrderDateFilter/${startDate}/${endDate}`;

		fetchSales(orderDateFilterURL, this.initOrderDateFilter);
	};

	render() {
		const orders = this.props.orders;
		if (!orders) {
			return null;
		}

		const dateFormat = "YYYY-MM-DD";

		// Top 10 Product Sales View
		const top10ProductSalesView = new DataView();
		top10ProductSalesView.source(this.state.top10ProductSales).transform({
			type: "sort",
			callback(a, b) {
				return a.Sold_Quantity - b.Sold_Quantity > 0;
			},
		});

		const dataViewDynamic = new DataView();
		dataViewDynamic.source(orders);

		const colsOrders = {
			Order_Date: {
				type: "time",
				range: [0, 1],
				mask: "YYYY-MM-DD HH:mm:ss",
			},
			Price: { alias: "Price" },
		};

		return (
			<React.Fragment>
				<Row>
					<Col span={11}>
						<b>Category Sales</b>
						<Pie
							hasLegend
							title="Category Sales"
							data={this.state.categorySales}
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
							data={this.state.producerSales}
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
							data={top10ProductSalesView}
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
						<div>
							<b>Product Sales Filter by Date Range:</b>
							<div>Sold: {this.state.orderDateFilter.length}</div>
							<div>
								Total Price:{" "}
								{this.state.orderDateFilter
									.reduce(
										(total, elem) => total + elem.Price,
										0
									)
									.formatVND()}
							</div>
						</div>
						<div
							style={{
								width: "100%",
								textAlign: "center",
							}}
						>
							<RangePicker
								defaultValue={[moment(0), moment(moment())]}
								format={dateFormat}
								onChange={this.onChange}
								style={{
									margin: "1% 0px",
								}}
							/>
						</div>

						<Chart
							padding="auto"
							height={400}
							data={this.state.orderDateFilter}
							scale={colsOrders}
							forceFit
						>
							<Axis name="Price" />
							<Axis
								name="Order_Date"
								line={{ stroke: "#E6E6E6" }}
							/>
							<Tooltip />
							<Geom
								type="line"
								position="Order_Date*Price"
								size={1}
								color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
								shape="smooth"
								style={{
									shadowColor:
										"l (270) 0:rgba(21, 146, 255, 0)",
									shadowBlur: 60,
									shadowOffsetY: 6,
								}}
								tooltip={[
									"Order_Date*Price",
									(_, Price) => {
										return {
											name: "Price",
											value: Number(Price).formatVND(),
										};
									},
								]}
							/>
						</Chart>
					</Col>
				</Row>
			</React.Fragment>
		);
	}
}
