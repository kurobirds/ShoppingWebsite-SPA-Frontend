import React from "react";
import { Form, Input } from "antd";
const FormItem = Form.Item;

export default class FormProducers extends React.Component {
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
				<FormItem {...formItemLayout} label="Name">
					{getFieldDecorator("NameNSX", {
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
