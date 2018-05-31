import React, { Component } from "react";
import UserDropdown from "../Dropdown/UserDropdown";
import GuestMenu from "../Menu/GuestMenu";
import { Layout, Badge, Icon } from "antd";
const { Header } = Layout;

export default class NormalNavigation extends Component {
	render() {
		const carts = this.props.carts || [];
		const cartsLength = carts.length;
		return (
			<Header
				style={{
					zIndex: "9",
					position: "fixed",
					width: "100%",
					background: this.props.isDark ? null : "#fff",
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
				<Badge count={cartsLength}>
					<Icon
						type="shopping-cart"
						style={{ fontSize: 24, marginRight: 8 }}
					/>
				</Badge>
				{this.props.isAuthenticated ? (
					<UserDropdown
						menu={this.props.menu}
						handleMenuClick={this.props.handleMenuClick}
					/>
				) : (
					<GuestMenu isDark={this.props.isDark} />
				)}
			</Header>
		);
	}
}
