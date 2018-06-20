import React, { Component } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
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

class RegisterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSuccess: false,
			confirmDirty: false,
			autoCompleteResult: [],
			endpoint: "sign-up",
		};
	}

	handleSubmit = e => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {
				let config = {
					method: "POST",
					headers: { "Content-Type": " application/json" },
					body: JSON.stringify(values),
				};
				fetch(`${this.props.base_url}${this.state.endpoint}`, config)
					.then(res => res.json())
					.then(data => {
						message.success(data.message);
						this.setState({ isSuccess: true });
					})
					.catch(err => console.log(err));
			}
		});
	};

	handleValidUsername = (rule, value, callback) => {
		if (value) {
			fetch(`${this.props.base_url}${this.state.endpoint}/${value}`)
				.then(res => res.json())
				.then(data => {
					if (!data.ok) {
						callback(data.message);
					}
					callback();
				})
				.catch(err => console.log(err));
		} else {
			callback();
		}
	};
	handleConfirmBlur = e => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};
	compareToFirstPassword = (rule, value, callback) => {
		const { getFieldValue } = this.props.form;
		if (value && value !== getFieldValue("Password")) {
			callback("Two passwords that you enter is inconsistent!");
		} else {
			callback();
		}
	};
	validateToNextPassword = (rule, value, callback) => {
		const { validateFields } = this.props.form;
		if (value && this.state.confirmDirty) {
			validateFields(["confirm"], { force: true });
		}
		callback();
	};
	render() {
		if (this.props.isAuthenticated || this.state.isSuccess) {
			return <Redirect to="/" />;
		}

		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
				span: 6,
			},
			wrapperCol: {
				span: 14,
			},
		};

		return (
			<div
				className="animated slideInUp"
				style={{
					height: "99vh",
					width: "99vw",
					overflow: "hidden",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<BodyInner>
					<div
						style={{
							position: "relative",
							marginBottom: "15px",
							border: "1px solid rgba(0, 0, 0, .1)",
							borderRadius: ".25rem",
							backgroundColor: "white",
							width: 600,
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
								Register
							</h1>
							<Form
								onSubmit={this.handleSubmit}
								style={{
									minWidth: "480px",
								}}
							>
								<FormItem
									{...formItemLayout}
									label="Username"
									hasFeedback
								>
									{getFieldDecorator("Username", {
										rules: [
											{
												required: true,
												message:
													"Please input your Username!",
											},
											{
												validator: this
													.handleValidUsername,
											},
										],
									})(<Input />)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="Password"
									hasFeedback
								>
									{getFieldDecorator("Password", {
										rules: [
											{
												required: true,
												message:
													"Please input your Password!",
											},
											{
												validator: this
													.validateToNextPassword,
											},
										],
									})(<Input type="password" />)}
								</FormItem>
								<FormItem
									{...formItemLayout}
									label="Confirm Password"
									hasFeedback
								>
									{getFieldDecorator("confirm", {
										rules: [
											{
												required: true,
												message:
													"Please confirm your Password!",
											},
											{
												validator: this
													.compareToFirstPassword,
											},
										],
									})(
										<Input
											type="password"
											onBlur={this.handleConfirmBlur}
										/>
									)}
								</FormItem>
								<FormItem>
									<Button
										type="primary"
										htmlType="submit"
										style={{
											width: "100%",
										}}
									>
										Register
									</Button>
								</FormItem>
							</Form>
						</div>
					</div>
					<div
						style={{
							zIndex: 1,
							position: "relative",
							textAlign: "center",
						}}
					>
						<Link
							style={{
								fontSize: "14px",
								color: "white",
							}}
							to="/sign-in"
						>
							Sign in
						</Link>
					</div>
				</BodyInner>
			</div>
		);
	}
}

export default Form.create()(RegisterForm);
