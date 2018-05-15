import React from "react";
import { Form, Input, InputNumber } from "antd";
const FormItem = Form.Item;

export default class FormProduct extends React.Component {
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
			<Form layout="horizontal">
				<FormItem {...formItemLayout} label="ProName">
					{getFieldDecorator("ProName", {
						rules: [
							{
								required: true,
								message:
									"Please input the title of collection!",
							},
						],
					})(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Tiny Description">
					{getFieldDecorator("TinyDes")(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Price">
					{getFieldDecorator("description")(<InputNumber />)}
				</FormItem>
				<FormItem {...formItemLayout} label="CatID">
					{getFieldDecorator("CatID")(<InputNumber />)}
				</FormItem>
				<FormItem {...formItemLayout} label="IDNSX">
					{getFieldDecorator("IDNSX")(<InputNumber />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Quantity">
					{getFieldDecorator("Quantity")(<InputNumber />)}
				</FormItem>
				<FormItem {...formItemLayout} label="SLB">
					{getFieldDecorator("SLB")(<InputNumber />)}
				</FormItem>
				<FormItem {...formItemLayout} label="LX">
					{getFieldDecorator("LX")(<InputNumber />)}
				</FormItem>
				<FormItem {...formItemLayout} label="XX">
					{getFieldDecorator("XX")(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="SLAnh">
					{getFieldDecorator("SLAnh")(<InputNumber />)}
				</FormItem>
			</Form>
		);
	}
}
