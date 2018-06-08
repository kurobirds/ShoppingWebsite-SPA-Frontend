import React, { Component, Fragment } from "react";
import NormalNavigation from "./common/Navigation/NormalNavigation";
import RouteProduct from "../routes/products";
import {
	SideBar,
	RefinementListFilter,
	DynamicRangeFilter,
	ItemHistogramList,
} from "searchkit";

import decode from "jwt-decode";

import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, message, Row, Col, Checkbox } from "antd";

const { Content, Footer } = Layout;

const breadcrumbNameMap = {
	"/product": "Product List",
};

let location,
	pathSnippets,
	extraBreadcrumbItems,
	breadcrumbItems,
	checkboxOption = [];

const RefinementOption = props => {
	console.log(props);
	return (
		<div
			className={props.bemBlocks
				.option()
				.state({ selected: props.selected })
				.mix(props.bemBlocks.container("item"))}
			onClick={props.onClick}
		>
			<Checkbox
				className={props.bemBlocks.option("text")}
				checked={props.active}
				onChange={props.onClick}
			>
				{props.label}
			</Checkbox>
			<div className={props.bemBlocks.option("text")} />
			<div className={props.bemBlocks.option("count")}>{props.count}</div>
		</div>
	);
};

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDark: false,
		};
	}
	componentDidMount() {
		this.props.fetchProducts(`${this.props.base_url}products`);
		this.props.fetchCategories(`${this.props.base_url}categories`);
		this.props.fetchProducers(`${this.props.base_url}producers`);
	}

	handleMenuClick = e => {
		switch (e.key) {
			case "1":
				message.info(`Clicked ${e.item.props.children}`);
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
			<Menu.Item key="1">About</Menu.Item>
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

		if (this.props.categories) {
			checkboxOption = this.props.categories.map(element => ({
				Name: element.Name,
				_id: element._id,
			}));
		}
	}

	render() {
		let products = this.props.products;

		return (
			<Fragment>
				<Layout>
					<NormalNavigation
						menu={this.menu}
						handleMenuClick={this.handleMenuClick}
						isAuthenticated={this.props.isAuthenticated}
						isDark={this.state.isDark}
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
							<SideBar>
								<div
									style={{
										margin: "0px 10%",
									}}
								>
									<RefinementListFilter
										id="categories"
										title="Categories"
										field={"Producer_Detail.Name"}
										operator="OR"
										size={10}
										itemComponent={RefinementOption}
									/>
									<DynamicRangeFilter
										field="Price"
										id="price_filter"
										title="Price Filter"
										rangeFormatter={number =>
											number.formatVND()
										}
									/>
								</div>
							</SideBar>
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
										<RouteProduct products={products} />
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
