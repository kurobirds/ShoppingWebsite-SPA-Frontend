import React, { Component } from "react";
import UserDropDown from "../common/Dropdown/UserDropdown";
import styled from "styled-components";
import Main from "../../routes/dashboard";
import DashboardNavigation from "../common/Navigation/DashboardNavigation";
import decode from "jwt-decode";
import { Redirect } from "react-router-dom";
import { Layout, Icon, Menu, message } from "antd";
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

	isTokenExpired = () => {
		try {
			const decoded = decode(this.props.token);
			if (decoded.exp < Date.now() / 1000) {
				return true;
			} else return false;
		} catch (err) {
			return false;
		}
	};

	isAdmin = () => {
		try {
			const decoded = decode(this.props.token);
			if (decoded.Permission === 1) {
				return true;
			} else return false;
		} catch (err) {
			return false;
		}
	};

	componentDidUpdate() {
		if (this.isTokenExpired()) {
			message.error("Token expired");
			this.props.logoutUser();
			return;
		}
	}

	componentDidMount() {
		if (!this.props.isAuthenticated) {
			message.error("Need login to access this site");
			return;
		}
		if (this.isTokenExpired()) {
			message.error("Token expired");
			this.props.logoutUser();
			return;
		}
		if (!this.isAdmin()) {
			message.error("This site need Admin Permission");
			return;
		}
	}

	render() {
		if (!this.props.isAuthenticated) {
			return <Redirect to="/" />;
		}

		if (!this.isAdmin()) {
			return <Redirect to="/" />;
		}

		const arrayURL = this.props.location.pathname.split("/");

		let selectedKey = 1;

		switch (arrayURL[arrayURL.length - 1]) {
			case "orders":
				selectedKey = 2;
				break;
			case "products":
				selectedKey = 3;
				break;
			case "categories":
				selectedKey = 4;
				break;
			case "producers":
				selectedKey = 5;
				break;
			case "users":
				selectedKey = 6;
				break;
			default:
				selectedKey = 1;
				break;
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
				<DashboardNavigation
					selectedKey={selectedKey}
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
							<UserDropDown
								menu={this.menu}
								handleMenuClick={this.handleMenuClick}
							/>
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
