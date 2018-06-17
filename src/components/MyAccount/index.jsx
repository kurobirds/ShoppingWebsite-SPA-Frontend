import React, { Component } from "react";
import decode from "jwt-decode";

import moment from "moment";
import styled from "styled-components";

import NormalNavigation from "../common/Navigation/NormalNavigation";
import ModalEditDetails from "./ModalEditDetails";
import ModalChangePassword from "./ModalChangePassword";
import OrderTable from "./OrderTable";

import { Link, Redirect } from "react-router-dom";

import {
	Button,
	Form,
	Layout,
	Row,
	Col,
	Spin,
	Icon,
	Menu,
	message,
} from "antd";
const { Content, Footer } = Layout;
const antIcon = <Icon type="loading" style={{ fontSize: 64 }} spin />;

const WrapperInfo = styled.div`
	font-family: Open Sans, sans-serif;
	color: #555;
`;

const Title = WrapperInfo.extend`
	font-weight: 700;
	font-size: 18px;
`;

const Description = styled.p`
	font-weight: 400;
	font-size: 18px;
`;

const ColumnTitle = styled.div`
	font-size: 26px;
	font-weight: 400;
	color: #5c433d;
	font-family: Montserrat, sans-serif;
	margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
	margin-right: 10px;
	width: 190px;
	font-size: 12px;
	font-family: Montserrat, sans-serif;
`;

class MyAccount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			endpoint: `${this.props.base_url}users/`,
			user: null,
			orders: null,
			detailsModalVisible: false,
			passwordModalVisible: false,
		};
	}

	componentDidMount() {
		if (!this.props.isAuthenticated) {
			return <Redirect to="/" />;
		}

		const token = this.props.token;

		const decoded = decode(token);

		const id = decoded._id;

		// fetch user info
		fetch(`${this.state.endpoint}${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then(response => response.json())
			.then(data => {
				this.setState({ user: data });
			})
			.catch(err => console.error(err));

		// fetch list order of current user
		fetch(`${this.state.endpoint}${id}/orders`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then(response => response.json())
			.then(data => {
				for (const elem of data) {
					elem.Price = elem.Price.formatVND();
				}
				this.setState({ orders: data });
			})
			.catch(err => console.error(err));
	}

	handleMenuClick = e => {
		switch (e.key) {
			case "1":
				break;
			case "3":
				this.props.logoutUser();
				message.success("Logout success");
				break;
			default:
				console.log(`Clicked ${e.item.props.children}`);
				break;
		}
	};

	closeModal = () => {
		this.setState({
			detailsModalVisible: false,
			passwordModalVisible: false,
		});
	};

	menu = (
		<Menu onClick={this.handleMenuClick}>
			<Menu.Item key="1">
				<Link to="/account">My Account</Link>
			</Menu.Item>
			{this.props.isAuthenticated &&
			decode(localStorage.token).Permission === 1 ? (
				<Menu.Item key="2">
					<Link to="/admin">Dashboard</Link>
				</Menu.Item>
			) : null}
			<Menu.Item key="3">Logout</Menu.Item>
		</Menu>
	);

	render() {
		if (!this.props.isAuthenticated) {
			return <Redirect to="/" />;
		}

		const user = this.state.user,
			orders = this.state.orders;

		if (!!!user || !!!orders) {
			return (
				<div
					style={{
						height: "100vh",
						width: "100vw",
						overflow: "hidden",
						backgroundColor: "#fff",
					}}
				>
					<Spin
						style={{
							margin: "24% 50% 24% 50%",
						}}
						indicator={antIcon}
					/>
				</div>
			);
		}

		return (
			<React.Fragment>
				<ModalEditDetails
					visible={this.state.detailsModalVisible}
					closeModal={this.closeModal}
					userInfo={user}
					endpoint={this.state.endpoint}
				/>
				<ModalChangePassword
					visible={this.state.passwordModalVisible}
					closeModal={this.closeModal}
					userInfo={user}
					endpoint={this.state.endpoint}
				/>
				<Layout>
					<NormalNavigation
						menu={this.menu}
						handleMenuClick={this.handleMenuClick}
						isAuthenticated={this.props.isAuthenticated}
						carts={this.props.carts}
						deleteCart={this.props.deleteCart}
					/>
					<Content
						style={{
							padding: "20px 0px",
							marginTop: 64,
							background: "#fff",
						}}
					>
						<h2 style={{ textAlign: "center" }}>My Account</h2>
						<Row>
							<Col span={12} style={{ paddingLeft: "20%" }}>
								<ColumnTitle>Details</ColumnTitle>
								<WrapperInfo>
									<Title>Full Name</Title>
									<Description>{user.Name}</Description>
								</WrapperInfo>
								<WrapperInfo>
									<Title>Email</Title>
									<Description>{user.Email}</Description>
								</WrapperInfo>
								<WrapperInfo>
									<Title>Day of Birth</Title>
									<Description>
										{moment
											.unix(user.DOB)
											.format("YYYY-MM-DD")}
									</Description>
								</WrapperInfo>
								<StyledButton
									type="primary"
									size="large"
									onClick={() => {
										this.setState({
											detailsModalVisible: true,
										});
									}}
								>
									EDIT DETAILS
								</StyledButton>
								<StyledButton
									type="primary"
									size="large"
									style={{
										marginLeft: "15px",
									}}
									onClick={() => {
										this.setState({
											passwordModalVisible: true,
										});
									}}
								>
									CHANGE PASSWORD
								</StyledButton>
							</Col>
							<Col span={12} style={{ textAlign: "center" }}>
								<ColumnTitle>Last Order</ColumnTitle>
								<OrderTable orders={orders} />
							</Col>
						</Row>
					</Content>
					<Footer style={{ textAlign: "center" }}>
						Ant Design ©2016 Created by Ant UED
					</Footer>
				</Layout>
			</React.Fragment>
		);
	}
}

const Wrapped = Form.create()(MyAccount);

export default Wrapped;
