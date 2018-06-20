import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

export default class GuestMenu extends Component {
	render() {
		return (
			<Menu
				theme="light"
				mode="horizontal"
				style={{
					lineHeight: "64px",
					float: "right",
					height: "99%",
					border: "none",
				}}
			>
				<Menu.Item key="1">
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
		);
	}
}
