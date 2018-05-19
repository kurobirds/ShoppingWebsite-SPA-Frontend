import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
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
	state = {
		confirmDirty: false,
		autoCompleteResult: [],
	};
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log("Received values of form: ", values);
			}
		});
	};
	handleConfirmBlur = e => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};
	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue("password")) {
			callback("Two passwords that you enter is inconsistent!");
		} else {
			callback();
		}
	};
	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(["confirm"], { force: true });
		}
		callback();
	};
	render() {
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
									label="E-mail"
									hasFeedback
								>
									{getFieldDecorator("email", {
										rules: [
											{
												type: "email",
												message:
													"The input is not valid E-mail!",
											},
											{
												required: true,
												message:
													"Please input your E-mail!",
											},
										],
									})(<Input />)}
								</FormItem>
								<FormItem {...formItemLayout} label="Password">
									{getFieldDecorator("password", {
										rules: [
											{
												required: true,
												message:
													"Please input your password!",
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
								>
									{getFieldDecorator("confirm", {
										rules: [
											{
												required: true,
												message:
													"Please confirm your password!",
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
							margin: "15px 0 0",
							textAlign: "center",
						}}
					>
						<Link
							style={{
								fontSize: "1.10rem",
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
