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
					{getFieldDecorator("f_Username", {
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
					{getFieldDecorator("f_Password")(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Name">
					{getFieldDecorator("f_Name")(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Email">
					{getFieldDecorator("f_Email")(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Day of Birth">
					{getFieldDecorator("f_DOB")(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Permission">
					{getFieldDecorator("f_Permission")(<Input />)}
				</FormItem>
			</Form>
		);
	}
}
