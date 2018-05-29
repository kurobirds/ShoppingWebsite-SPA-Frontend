import React, { Component } from "react";

import styled from "styled-components";

import { Dropdown, Avatar } from "antd";

const StyledAvatar = styled(Avatar)`
	float: right;
	margin: 12px 40px 0 0 !important;
	cursor: pointer;
	&: hover {
		background-color: #1da57a;
	}
`;

export default class UserDropdown extends Component {
	render() {
		return (
			<Dropdown overlay={this.props.menu} placement="bottomCenter">
				<StyledAvatar size="large" icon="user" />
			</Dropdown>
		);
	}
}
