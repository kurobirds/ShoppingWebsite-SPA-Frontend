import React from "react";
import { Form, Input, DatePicker, Radio } from "antd";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class FormUser extends React.Component {
	render() {
		const dateFormat = "YYYY-MM-DD";
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
				<FormItem {...formItemLayout} hasFeedback label="Username">
					{getFieldDecorator("Username", {
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
					{getFieldDecorator("Password")(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Name">
					{getFieldDecorator("Name")(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Email">
					{getFieldDecorator("Email")(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} hasFeedback label="Day of Birth">
					{getFieldDecorator("DOB", {
						rules: [
							{
								required: true,
								message: "Please select time!!",
							},
						],
					})(<DatePicker format={dateFormat} />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Permission">
					{getFieldDecorator("Permission")(
						<RadioGroup>
							<Radio value={0}>User</Radio>
							<Radio value={1}>Admin</Radio>
						</RadioGroup>
					)}
				</FormItem>
			</Form>
		);
	}
}
