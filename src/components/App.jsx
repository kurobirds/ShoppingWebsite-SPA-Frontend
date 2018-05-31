import React, { Component, Fragment } from "react";
import NormalNavigation from "./common/Navigation/NormalNavigation";
import RouteProduct from "../routes/products";

import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, message } from "antd";

const { Content, Footer, Sider } = Layout;

const breadcrumbNameMap = {
	"/product": "Product List",
};

let location, pathSnippets, extraBreadcrumbItems, breadcrumbItems;

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
			<Menu.Item key="2">
				<Link to="/admin">Dashboard</Link>
			</Menu.Item>
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
						{index === 0 ? "Product List" : pathSnippets[index]}
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
					/>
					<Layout>
						<Sider
							style={{
								overflow: "auto",
								height: "100vh",
								position: "fixed",
								left: 0,
								background: this.state.isDark ? null : "#fff",
							}}
						>
							Sider
						</Sider>
						<Content
							style={{
								marginLeft: 200,
								padding: "0 50px",
								marginTop: 64,
							}}
						>
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

					<Footer style={{ textAlign: "center" }}>
						Ant Design ©2016 Created by Ant UED
					</Footer>
				</Layout>
			</Fragment>
		);
	}
}
