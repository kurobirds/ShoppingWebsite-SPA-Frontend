import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox } from "antd";
const FormItem = Form.Item;

class NormalLoginForm extends Component {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log("Received values of form: ", values);
			}
		});
	};
	render() {
		const { getFieldDecorator } = this.props.form;
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
								className="login-form box-body"
							>
								<FormItem>
									{getFieldDecorator("userName", {
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
								<FormItem>
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
									<a className="login-form-forgot" href="">
										Forgot password
									</a>
									<Button
										type="primary"
										htmlType="submit"
										className="login-form-button"
									>
										Log in
									</Button>
									Or <a href="">register now!</a>
								</FormItem>
							</Form>
						</div>
					</div>
				</BodyInner>
			</div>
		);
	}
}

export default Form.create()(NormalLoginForm);
