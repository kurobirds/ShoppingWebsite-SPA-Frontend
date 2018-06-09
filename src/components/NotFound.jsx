import React, { Component } from "react";
import Exception from "ant-design-pro/lib/Exception";
import { Button } from "antd";
import { Link } from "react-router-dom";

export default class NotFound extends Component {
	render() {
		return (
			<div
				style={{
					height: "100vh",
					background: "#ececec",
					overflow: "hidden",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#fff",
				}}
			>
				<Exception
					type="404"
					actions={
						<Button type="primary">
							<Link to="/">Home Page</Link>
						</Button>
					}
					desc="Sorry, the page not found"
				/>
			</div>
		);
	}
}
