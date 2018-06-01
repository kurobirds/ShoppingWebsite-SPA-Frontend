import React from "react";
import moment from "moment";
import { Form, Input, DatePicker } from "antd";
const FormItem = Form.Item;

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
				<FormItem {...formItemLayout} label="Username">
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
				<FormItem {...formItemLayout} label="Day of Birth">
					{getFieldDecorator("DOB")(
						<DatePicker format={dateFormat} />
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="Permission">
					{getFieldDecorator("Permission")(<Input />)}
				</FormItem>
			</Form>
		);
	}
}
