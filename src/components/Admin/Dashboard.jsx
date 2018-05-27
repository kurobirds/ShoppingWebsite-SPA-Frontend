import React, { Component } from "react";
import styled from "styled-components";
import Main from "../../routes/dashboard";
import Navigation from "../Navigation";
import { Redirect } from "react-router-dom";
import { Layout, Icon, Dropdown, Menu, message, Avatar } from "antd";
const { Header, Content, Footer } = Layout;

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

const StyledAvatar = styled(Avatar)`
	float: right;
	margin: 12px 40px 0 0 !important;
	cursor: pointer;
	&: hover {
		background-color: #1da57a;
	}
`;

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
			siderColor: null,
			sizeNav: 200,
		};
	}

	handleMenuClick = e => {
		switch (e.key) {
			case "2":
				this.props.logoutUser();
				message.success("Logout success");
				break;
			default:
				message.info(`Clicked ${e.item.props.children}`);
				break;
		}
	};

	menu = (
		<Menu onClick={this.handleMenuClick}>
			<Menu.Item key="1">About</Menu.Item>
			<Menu.Item key="2">Logout</Menu.Item>
		</Menu>
	);

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	render() {
		if (!this.props.isAuthenticated) {
			message.error("Need login to access this site");
			return <Redirect to="/" />;
		}
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
						<div>
							<StyledIcon
								type={
									this.state.collapsed
										? "menu-unfold"
										: "menu-fold"
								}
								onClick={this.toggle}
							/>
							<Dropdown
								overlay={this.menu}
								placement="bottomCenter"
							>
								<StyledAvatar size="large" icon="user" />
							</Dropdown>
						</div>
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
