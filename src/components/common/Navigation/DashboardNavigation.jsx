import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon, Switch } from "antd";
import logoImg from "./Logo.jpg";
const { Sider } = Layout;
const { SubMenu } = Menu;

const SwitchColor = styled.section`
	width: 100%;
	position: absolute;
	bottom: 0;
	height: 48px;
	background-color: ${props => props.theme.bgColor};
	border-top: solid 1px ${props => props.theme.bdColor};
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 16px;
	overflow: hidden;
	z-index: 9;
	transition: all 0.3s;
`;

const Logo = styled.div`
	height: 80px;
	background: url(${logoImg});
	background-size: 100% 100%;
	margin: 16px;
`;

export default class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			theme: "dark",
			isDark: true,
		};
	}

	changeTheme = value => {
		this.setState({
			theme: value ? "dark" : "light",
			isDark: value ? true : false,
		});
	};

	render() {
		const dark = {
			bgColor: "#000d18",
			bdColor: "#001629",
		};

		const light = {
			bgColor: "#fff",
			bdColor: "#f8f8f8",
		};

		return (
			<Sider
				collapsed={this.props.collapsed}
				onCollapse={this.props.toggle}
				style={{
					background: this.state.isDark ? null : "#fff",
					overflow: "auto",
					height: "100vh",
					position: "fixed",
					left: 0,
				}}
			>
				<Link to="/">
					<Logo />
				</Link>
				<Menu
					theme={this.state.theme}
					mode="inline"
					selectedKeys={[`${this.props.selectedKey}`]}
				>
					<Menu.Item key="1">
						<Icon type="dashboard" />
						<span>Dashboard</span>
						<Link to="/admin" />
					</Menu.Item>
					<Menu.Item key="2">
						<Icon type="profile" />
						<span>Orders</span>
						<Link to="/admin/orders" />
					</Menu.Item>
					<SubMenu
						title={
							<span>
								<Icon type="tags-o" />
								<span>Catalog</span>
							</span>
						}
					>
						<Menu.Item key="3">
							<span>Products</span>
							<Link to="/admin/products" />
						</Menu.Item>
						<Menu.Item key="4">
							<span>Categories</span>
							<Link to="/admin/categories" />
						</Menu.Item>
						<Menu.Item key="5">
							<span>Producers</span>
							<Link to="/admin/producers" />
						</Menu.Item>
					</SubMenu>
					<Menu.Item key="6">
						<Icon type="team" />
						<span>Users</span>
						<Link to="/admin/users" />
					</Menu.Item>
				</Menu>

				{this.props.collapsed ? (
					""
				) : (
					<SwitchColor theme={this.state.isDark ? dark : light}>
						<span
							style={{
								color: "#666",
								fontSize: "12px",
								fontFamily: "Segoe UI",
							}}
						>
							<Icon
								type="bulb"
								style={{
									fontSize: "14px",
								}}
							/>{" "}
							Switch Theme
						</span>
						<Switch
							checked={this.state.theme === "dark"}
							onChange={this.changeTheme}
							checkedChildren="Dark"
							unCheckedChildren="Light"
						/>
					</SwitchColor>
				)}
			</Sider>
		);
	}
}
