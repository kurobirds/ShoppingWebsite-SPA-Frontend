import React from "react";
import moment from "moment";
import decode from "jwt-decode";
import { Form, Input, Button, Icon } from "antd";
const FormItem = Form.Item;

class FormComment extends React.Component {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const id = this.props.id;

				values.createdAt = moment().unix();

				const config = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values),
				};

				const url = `${this.props.base_url}products/${id}/comments`;

				const request = async () => {
					const response = await fetch(url, config);
					const json = await response.json();

					this.props.updateComment(json);

					this.props.form.resetFields();
				};

				request();
			}
		});
	};
	render() {
		const { getFieldDecorator } = this.props.form;

		let userName = "";
		if (this.props.auth.isAuthenticated) {
			const decoded = decode(this.props.auth.token);
			userName = decoded.Name;
		}
		return (
			<Form layout="inline" onSubmit={this.handleSubmit}>
				<FormItem>
					{getFieldDecorator("author", {
						initialValue: userName,
						rules: [
							{
								required: true,
								message: "Please input author name!",
							},
						],
					})(
						<Input
							prefix={
								<Icon
									type="user"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							}
							placeholder="author"
							disabled={this.props.auth.isAuthenticated}
						/>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator("comment")(
						<Input
							prefix={
								<Icon
									type="message"
									style={{ color: "rgba(0,0,0,.25)" }}
								/>
							}
							type="comment"
							placeholder="write a comment"
						/>
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit">
						Post comment
					</Button>
				</FormItem>
			</Form>
		);
	}
}

const WrappedHFormComment = Form.create()(FormComment);

export default WrappedHFormComment;
