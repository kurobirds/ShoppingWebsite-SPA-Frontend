import React, { Component } from "react";
import styled from "styled-components";
import Main from "../../routes/dashboard";
import Navigation from "../Navigation";
import { Layout, Icon } from "antd";
const { Header, Content, Footer } = Layout;

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
			siderColor: null,
			sizeNav: 200,
		};
	}

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	render() {
		const StyledIcon = styled(Icon)`
			font-size: 18px;
			line-height: 64px;
			padding: 0 24px;
			cursor: pointer;
			transition: color 0.3s;
			&: hover {
				color: #1da57a;
			}
		`;
		return (
			<Layout
				style={
					this.state.collapsed
						? {
								marginLeft: 80,
						  }
						: {
								marginLeft: 200,
						  }
				}
			>
				<Navigation
					collapsed={this.state.collapsed}
					toggle={this.toggle}
				/>
				<Layout>
					<Header style={{ background: "#fff", padding: 0 }}>
						<StyledIcon
							type={
								this.state.collapsed
									? "menu-unfold"
									: "menu-fold"
							}
							onClick={this.toggle}
						/>
					</Header>
					<Content
						style={{
							margin: "24px 16px",
							padding: 24,
							background: "#fff",
							minHeight: 280,
						}}
					>
						<Main />
					</Content>
					<Footer>Footer</Footer>
				</Layout>
			</Layout>
		);
	}
}
