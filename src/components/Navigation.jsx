import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon, Switch } from "antd";
const { Sider } = Layout;

export default class Navigation extends Component {
	state = {
		theme: "dark",
		isDark: true,
	};

	changeTheme = value => {
		this.setState({
			theme: value ? "dark" : "light",
			isDark: value ? true : false,
		});
	};

	render() {
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
					left: 0,
				}}
			>
				<Menu
					theme={this.state.theme}
					mode="inline"
					defaultSelectedKeys={["1"]}
				>
					<Menu.Item key="1">
						<Icon type="dashboard" />
						<span>Dashboard</span>
						<Link to="/dashboard" />
					</Menu.Item>
					<Menu.Item key="2">
						<Icon type="video-camera" />
						<span>nav 2</span>
						<Link to="/about" />
					</Menu.Item>
					<Menu.Item key="3">
						<Icon type="upload" />
						<span>nav 3</span>
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
