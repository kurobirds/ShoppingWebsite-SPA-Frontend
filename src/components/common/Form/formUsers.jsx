import React from "react";
import { Form, Input } from "antd";
const FormItem = Form.Item;

export default class FormUser extends React.Component {
	render() {
		const { getFieldDecorator } = this.props.formField;
		const formItemLayout = {
			labelCol: {
				span: 6,
			},
			wrapperCol: {
				span: 14,
			},
		};
		return (
			<Form>
				<FormItem {...formItemLayout} label="Username">
					{getFieldDecorator("username", {
						rules: [
							{
								required: true,
								message:
									"Please input the title of collection!",
							},
						],
					})(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Password">
					{getFieldDecorator("password")(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Name">
					{getFieldDecorator("name")(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Email">
					{getFieldDecorator("email")(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Day of Birth">
					{getFieldDecorator("DOB")(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Permission">
					{getFieldDecorator("permission")(<Input />)}
				</FormItem>
			</Form>
		);
	}
}
