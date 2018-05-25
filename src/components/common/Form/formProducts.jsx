import React from "react";
import { Form, Input, InputNumber, Select } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;

const selectCategories = [];
const selectProducers = [];

export default class FormProduct extends React.Component {
	initList = (categories, producers) => {
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
				span: 6,
			},
			wrapperCol: {
				span: 14,
			},
		};
		return (
			<Form layout="horizontal">
				<FormItem {...formItemLayout} label="Name">
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
					{getFieldDecorator("Description")(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Price">
					{getFieldDecorator("Price")(
						<InputNumber style={{ width: 150 }} />
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="Categories_Detail">
					{getFieldDecorator("Categories_Detail")(
						<Select>{selectCategories}</Select>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="Producer_Detail">
					{getFieldDecorator("Producer_Detail")(
						<Select>{selectProducers}</Select>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="Quantity">
					{getFieldDecorator("Quantity")(
						<InputNumber style={{ width: 150 }} />
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="Sell_Quantity">
					{getFieldDecorator("Sell_Quantity")(
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
