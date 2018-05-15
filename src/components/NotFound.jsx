import React, { Component } from "react";

export default class NotFound extends Component {
	state = {
		animated: "",
	};
	enter = () => {
		this.setState({ animated: "hinge" });
	};

	render() {
		return (
			<div
				style={{
					height: "100vh",
					background: "#ececec",
					overflow: "hidden",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<img
					src="http://shorelineseafoodinc.com/assets/images/404.png"
					alt="404"
					className={`animated swing ${this.state.animated}`}
					onMouseEnter={this.enter}
				/>
			</div>
		);
	}
}
