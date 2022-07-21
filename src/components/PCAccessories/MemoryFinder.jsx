import React, { Component } from "react";

export default class MemoryFinder extends Component {
	render() {
		return (
			<div style={{
				height: "76vh",
			}}>
				<iframe src="https://local.corsair.com:9002/de/de/memoryfinderForMindFactory/systems&motherboard?type=motherboard" frameborder="0"
					width="100%"
					height="100%"
					className="MemoryFinder"
					id="iFrameResizer0"
					title="MemoryFinder"></iframe>
			</div>
		);
	}
}
