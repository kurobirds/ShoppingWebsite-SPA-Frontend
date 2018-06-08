import React from "react";
import { Form, Input, InputNumber, Select } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

var selectCategories = [];
var selectProducers = [];

export default class FormProduct extends React.Component {
	initList = (categories, producers) => {
		selectCategories = [];
		selectProducers = [];

		for (let element of categories) {
			selectCategories.push(
				<Option key={element._id}>{element.Name}</Option>
			);
		}

		for (let element of producers) {
			selectProducers.push(
				<Option key={element._id}>{element.Name}</Option>
			);
		}
	};

	componentDidMount() {
		const listCategory = this.props.listCategory;
		const listProducer = this.props.listProducer;
		this.initList(listCategory, listProducer);
	}

	render() {
		const { getFieldDecorator } = this.props.formField;
		const formItemLayout = {
			labelCol: {
				span: 8,
			},
			wrapperCol: {
				span: 12,
			},
		};
		return (
			<Form layout="horizontal">
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
				<FormItem {...formItemLayout} label="Description">
					{getFieldDecorator("Description")(
						<TextArea autosize={{ minRows: 2, maxRows: 6 }} />
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="Price">
					{getFieldDecorator("Price")(
						<InputNumber style={{ width: 150 }} />
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					hasFeedback
					label="Categories_Detail"
				>
					{getFieldDecorator("Categories_Detail", {
						rules: [
							{
								required: true,
								message: "Please select category!",
							},
						],
					})(<Select>{selectCategories}</Select>)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					hasFeedback
					label="Producer_Detail"
				>
					{getFieldDecorator("Producer_Detail", {
						rules: [
							{
								required: true,
								message: "Please select producer!",
							},
						],
					})(<Select>{selectProducers}</Select>)}
				</FormItem>
				<FormItem {...formItemLayout} label="Stock_Quantity">
					{getFieldDecorator("Stock_Quantity")(
						<InputNumber style={{ width: 150 }} />
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="Sold_Quantity">
					{getFieldDecorator("Sold_Quantity")(
						<InputNumber style={{ width: 150 }} />
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="View">
					{getFieldDecorator("View")(
						<InputNumber style={{ width: 150 }} />
					)}
				</FormItem>
			</Form>
		);
	}
}
