import React, { Component, Fragment } from "react";
import NormalNavigation from "./common/Navigation/NormalNavigation";
import RouteProduct from "../routes/products";

import {
	CategorySearch,
	MultiList,
	DynamicRangeSlider,
} from "@appbaseio/reactivesearch";

import decode from "jwt-decode";

import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, message, Row, Col } from "antd";

const { Content, Footer } = Layout;

const breadcrumbNameMap = {
	"/product": "Product List",
};

let location, pathSnippets, extraBreadcrumbItems, breadcrumbItems;

export default class App extends Component {
	componentDidMount() {
		this.props.fetchProducts(`${this.props.base_url}products`);
		this.props.fetchCategories(`${this.props.base_url}categories`);
		this.props.fetchProducers(`${this.props.base_url}producers`);
	}

	handleMenuClick = e => {
		switch (e.key) {
			case "1":
				break;
			case "3":
				this.props.logoutUser();
				message.success("Logout success");
				break;
			default:
				console.log(`Clicked ${e.item.props.children}`);
				break;
		}
	};

	menu = (
		<Menu onClick={this.handleMenuClick}>
			<Menu.Item key="1">
				<Link to="/account">My Account</Link>
			</Menu.Item>
			{this.props.isAuthenticated &&
			decode(localStorage.token).Permission === 1 ? (
				<Menu.Item key="2">
					<Link to="/admin">Dashboard</Link>
				</Menu.Item>
			) : null}
			<Menu.Item key="3">Logout</Menu.Item>
		</Menu>
	);

	UNSAFE_componentWillUpdate(props) {
		location = props.history.location;

		pathSnippets = location.pathname.split("/").filter(i => i);

		extraBreadcrumbItems = pathSnippets.map((_, index) => {
			const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
			if (index === pathSnippets.length - 1) {
				return (
					<Breadcrumb.Item key={url}>
						{pathSnippets[index] === "product"
							? "Product List"
							: pathSnippets[index]}
					</Breadcrumb.Item>
				);
			}
			return (
				<Breadcrumb.Item key={url}>
					<Link to={url}>{breadcrumbNameMap[url]}</Link>
				</Breadcrumb.Item>
			);
		});
		breadcrumbItems = [
			<Breadcrumb.Item key="home">
				{extraBreadcrumbItems.length === 0 ? (
					"Home"
				) : (
					<Link to="/">Home</Link>
				)}
			</Breadcrumb.Item>,
			...extraBreadcrumbItems,
		];
	}

	render() {
		return (
			<Fragment>
				<Layout>
					<NormalNavigation
						menu={this.menu}
						handleMenuClick={this.handleMenuClick}
						isAuthenticated={this.props.isAuthenticated}
						carts={this.props.carts}
						deleteCart={this.props.deleteCart}
					/>
					<Row
						style={{
							padding: "0 20px",
							marginTop: 64,
						}}
					>
						<Col
							style={{
								padding: "20px 20px 0px 0px",
							}}
							span={4}
						>
							<Layout>
								<Content>
									<div
										style={{
											marginBottom: "5%",
											background: "#fff",
										}}
									>
										<CategorySearch
											componentId="SearchSensor"
											dataField="Name"
											categoryField="Categories_Detail.Name"
											placeholder="Search here"
											onSuggestion={suggestion => ({
												label: (
													<div>
														{
															suggestion._source
																.Name
														}{" "}
														in<span
															style={{
																color:
																	"dodgerblue",
																marginLeft: 5,
															}}
														>
															{
																suggestion
																	._source
																	.Categories_Detail
																	.Name
															}
														</span>
													</div>
												),
												value: suggestion._source.Name,
											})}
										/>
									</div>
									<div
										style={{
											marginBottom: "5%",
											background: "#fff",
										}}
									>
										<DynamicRangeSlider
											title="Price"
											componentId="PriceSensor"
											dataField="Price"
											rangeLabels={(min, max) => ({
												start: Number(min).formatVND(),
												end: Number(max).formatVND(),
											})}
										/>
									</div>
									<div
										style={{
											marginBottom: "5%",
											background: "#fff",
										}}
									>
										<MultiList
											componentId="CategoriesSensor"
											dataField="Categories_Detail.Name"
											title="Category"
											showSearch={false}
										/>
									</div>
									<div
										style={{
											marginBottom: "5%",
											background: "#fff",
										}}
									>
										<MultiList
											componentId="ProducerSensor"
											dataField="Producer_Detail.Name"
											title="Producer"
											showSearch={false}
										/>
									</div>
								</Content>
							</Layout>
						</Col>
						<Col span={20}>
							<Layout>
								<Content>
									<Breadcrumb style={{ margin: "16px 0" }}>
										{breadcrumbItems}
									</Breadcrumb>

									<div
										style={{
											background: "#fff",
											padding: 24,
											minHeight: 380,
										}}
									>
										<RouteProduct />
									</div>
								</Content>
							</Layout>
						</Col>
					</Row>
					<Footer style={{ textAlign: "center" }}>
						Ant Design ©2016 Created by Ant UED
					</Footer>
				</Layout>
			</Fragment>
		);
	}
}
