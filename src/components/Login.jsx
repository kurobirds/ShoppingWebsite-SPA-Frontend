import React, { Component } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox } from "antd";
const FormItem = Form.Item;

// Styled-component
const BodyInner = styled.div`
	position: relative;
	padding: 15px 20px;
	&::before {
		z-index: 0;
		content: " ";
		line-height: 0;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #1da57a;
		height: 200px;
		border-radius: 0 0 0.25rem 0.25rem;
	}
`;

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			endpoint: "login",
		};
	}
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (values.username && values.password) {
				this.props.loginUser(
					`${this.props.base_url}${this.state.endpoint}`,
					values
				);
			}
		});
	};
	render() {
		const { getFieldDecorator } = this.props.form;
		if (this.props.isAuthenticated) {
			return <Redirect to="/admin" />;
		}
		return (
			<div
				style={{
					paddingTop: "150px",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<BodyInner>
					<div
						style={{
							position: "relative",
							marginBottom: "1.5rem",
							border: "1px solid rgba(0, 0, 0, .1)",
							borderRadius: ".25rem",
							backgroundColor: "white",
							width: 400,
						}}
					>
						<div
							style={{
								padding: "1.25rem",
							}}
						>
							<h1
								style={{
									color: "#1da57a",
									textAlign: "center",
									fontSize: "34px",
									fontWeight: 400,
								}}
							>
								Signin
							</h1>
							<Form
								onSubmit={this.handleSubmit}
								style={{
									maxWidth: "480px",
								}}
							>
								<FormItem hasFeedback>
									{getFieldDecorator("username", {
										rules: [
											{
												required: true,
												message:
													"Please input your username!",
											},
										],
									})(
										<Input
											prefix={
												<Icon
													type="user"
													style={{
														color:
															"rgba(0,0,0,.25)",
													}}
												/>
											}
											placeholder="Username"
										/>
									)}
								</FormItem>
								<FormItem hasFeedback>
									{getFieldDecorator("password", {
										rules: [
											{
												required: true,
												message:
													"Please input your Password!",
											},
										],
									})(
										<Input
											prefix={
												<Icon
													type="lock"
													style={{
														color:
															"rgba(0,0,0,.25)",
													}}
												/>
											}
											type="password"
											placeholder="Password"
										/>
									)}
								</FormItem>
								<FormItem>
									{getFieldDecorator("remember", {
										valuePropName: "checked",
										initialValue: true,
									})(<Checkbox>Remember me</Checkbox>)}
									<Button
										type="primary"
										htmlType="submit"
										style={{
											width: "100%",
										}}
									>
										Log in
									</Button>
								</FormItem>
							</Form>
						</div>
					</div>
					<div
						style={{
							zIndex: 1,
							position: "relative",
							margin: "15px 0 0",
							textAlign: "center",
						}}
					>
						<Link
							style={{
								fontSize: "1.10rem",
								color: "white",
							}}
							to="/sign-up"
						>
							Sign up
						</Link>
					</div>
				</BodyInner>
			</div>
		);
	}
}

export default Form.create()(LoginForm);
