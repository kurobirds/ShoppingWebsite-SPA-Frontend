import React, { Component } from "react";
import Iframe from "react-iframe";

export default class MemoryFinder extends Component {
	render() {
		return (
			<div style={{
				height: "70vh",
			}}>
				<Iframe
					url="https://www.corsair.com/us/en/memoryfinderForMindFactory/systems&amp;motherboard"
					width="100%"
					height="100%"
					id="iFrameResizer0"
					scrolling="no"
					className="MemoryFinder"
					display="initial"
					position="relative"
					styles={{
						border: "1px solid rgb(206, 206, 206)",
						overflow: "hidden",
						height: "411.375px",
					}}
				/>
			</div>
		);
	}
}
