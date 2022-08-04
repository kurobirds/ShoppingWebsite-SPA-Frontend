import React, { Component } from "react";
import UserDropdown from "../Dropdown/UserDropdown";
import GuestMenu from "../Menu/GuestMenu";
import CartPopover from "../CartPopover";
import { Layout, Badge, Icon, Popover } from "antd";
const { Header } = Layout;

export default class NormalNavigation extends Component {
	render() {
		const carts = this.props.carts || [];
		let cartsLength = 0;
		for (const index in carts) {
			cartsLength += carts[index].Select_Quantity;
		}
		return (
			<Header
				style={{
					zIndex: "9",
					position: "fixed",
					width: "100%",
					background: "#fff",
					borderBottom: "1px solid #ddd",
				}}
			>
				<div
					style={{
						width: "150px",
						height: "64px",
						background: "rgba(255,255,255,.2)",
						margin: "0 24px 0 0",
						float: "left",
						display: "flex",
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<img
						style={{
							width: "48px",
							height: "48px"
						}}
						src="hiptechlg128.jpg"
					/>
					<span
						style={{
							fontSize: "14px",
							fontWeight: 800,
							fontFamily: "sans-serif",
							background: "linear-gradient(to right, #30CFD0, #330867 100%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent"
						}}
					>
						PopPro Store
					</span>
				</div>
				{this.props.isAuthenticated ? (
					<UserDropdown
						menu={this.props.menu}
						handleMenuClick={this.props.handleMenuClick}
					/>
				) : (
					<GuestMenu />
				)}
			</Header>
		);
	}
}
