import React, { Component, Fragment } from "react";
import Card from "./common/card";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, List } from "antd";
const { Header, Content, Footer } = Layout;

export default class App extends Component {
	componentDidMount() {
		this.props.fetchProducts(`${this.props.base_url}products`);
		this.props.fetchCategories(`${this.props.base_url}categories`);
		this.props.fetchProducers(`${this.props.base_url}producers`);
	}

	render() {
		let products = this.props.products;

		return (
			<Fragment>
				<Layout>
					<Header
						style={{
							zIndex: "9",
							position: "fixed",
							width: "100%",
						}}
					>
						<div
							style={{
								width: "120px",
								height: "31px",
								background: "rgba(255,255,255,.2)",
								margin: "16px 24px 16px 0",
								float: "left",
							}}
						/>
						<Menu
							theme="dark"
							mode="horizontal"
							style={{ lineHeight: "64px", float: "right" }}
						>
							<Menu.Item key="1">
								<Link to="/admin">
									<div
										style={{
											fontSize: "16px",
										}}
									>
										Admin
									</div>
								</Link>
							</Menu.Item>
							<Menu.Item key="2">
								<Link to="/sign-in">
									<div
										style={{
											fontSize: "16px",
										}}
									>
										Sign-in
									</div>
								</Link>
							</Menu.Item>
							<Menu.Item key="3">
								<Link to="/sign-up">
									<div
										style={{
											fontSize: "16px",
										}}
									>
										Sign-up
									</div>
								</Link>
							</Menu.Item>
						</Menu>
					</Header>
					<Content style={{ padding: "0 50px", marginTop: 64 }}>
						<Breadcrumb style={{ margin: "16px 0" }}>
							<Breadcrumb.Item>Home</Breadcrumb.Item>
							<Breadcrumb.Item>List</Breadcrumb.Item>
							<Breadcrumb.Item>App</Breadcrumb.Item>
						</Breadcrumb>
						<div
							style={{
								background: "#fff",
								padding: 24,
								minHeight: 380,
							}}
						>
							<List
								pagination={{
									showQuickJumper: true,
									onChange: page => {
										console.log(page);
									},
									pageSize: 12,
								}}
								grid={{
									gutter: 16,
									xs: 1,
									sm: 2,
									md: 4,
									lg: 4,
									xl: 6,
									xxl: 6,
								}}
								dataSource={products}
								renderItem={card => (
									<List.Item>
										<Card infoCard={card} />
									</List.Item>
								)}
							/>
						</div>
					</Content>
					<Footer style={{ textAlign: "center" }}>
						Ant Design ©2016 Created by Ant UED
					</Footer>
				</Layout>
			</Fragment>
		);
	}
}
