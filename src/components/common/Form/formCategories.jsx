import React from "react";
import { Form, Input } from "antd";
const FormItem = Form.Item;

export default class FormCategories extends React.Component {
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
				<FormItem {...formItemLayout} hasFeedback label="Name">
					{getFieldDecorator("Name", {
						rules: [
							{
								required: true,
								message:
									"Please input the title of collection!",
							},
						],
					})(<Input />)}
				</FormItem>
			</Form>
		);
	}
}
