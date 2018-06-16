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
						width: "120px",
						height: "31px",
						background: "rgba(255,255,255,.2)",
						margin: "16px 24px 16px 0",
						float: "left",
					}}
				/>
				<Badge count={cartsLength}>
					<Popover
						placement="bottom"
						content={
							<CartPopover
								carts={carts}
								deleteCart={this.props.deleteCart}
							/>
						}
						trigger="click"
					>
						<Icon
							type="shopping-cart"
							style={{
								fontSize: 24,
								marginRight: 8,
								cursor: "pointer",
							}}
						/>
					</Popover>
				</Badge>
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
