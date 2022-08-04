import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import CartPopover from "../CartPopover";
import { Layout, Badge, Icon, Popover } from "antd";

export default class GuestMenu extends Component {
	render() {
		const carts = this.props.carts || [];
		let cartsLength = 0;
		for (const index in carts) {
			cartsLength += carts[index].Select_Quantity;
		}
		return (
			<span style={{
				position: "relative",
				display: "flex",
				float: "right",
				width: "calc(100% - 64px - 120px)",
				justifyContent: "space-between",
				height: "99%",
			}}>
				<Menu
					theme="light"
					mode="horizontal"
					style={{
						lineHeight: "64px",
						border: "none"
					}}
				>
					<Menu.Item key="1">
						<Link to="/">
							<div
								style={{
									fontSize: "16px",
								}}
							>
								Home
							</div>
						</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/pc-accessories">
							<div
								style={{
									fontSize: "16px",
								}}
							>
								PC Accessories
							</div>
						</Link>
					</Menu.Item>
				</Menu>
				<Menu
					theme="light"
					mode="horizontal"
					style={{
						lineHeight: "64px",
						border: "none",
					}}
				>
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
					<Menu.Item key="1">
						<Link to="/sign-in">
							<div
								style={{
									fontSize: "16px",
								}}
							>
								Login
							</div>
						</Link>
					</Menu.Item>
					<Menu.Item key="2">
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
			</span>
		);
	}
}
