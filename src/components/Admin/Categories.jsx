import React, { Component } from "react";
import Table from "../common/Table";
import ModalComponent from "../common/Modal";

import { Modal, message } from "antd";
const { confirm } = Modal;

export default class Categories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formItem: {
				id: null,
				index: null,
			},
			columns: [
				{
					title: "Category",
					dataIndex: "CatName",
					key: "category",
				},
			],
		};
	}

	componentDidMount() {
		this.props.fetchData(`${this.props.base_url}categories`);
	}

	handleAdd = () => {
		console.log("handleAdd");
	};

	setFormFields = data => {
		this.formRef.props.form.setFieldsValue({
			CatName: data.CatName,
		});
	};

	handleMenuClick = (record, e) => {
		const deleteCategory = id => this.props.deleteCategory(id);
		const base_url = this.props.base_url;
		if (e.key === "1") {
			this.setState({
				visible: true,
				formItem: {
					id: record._id,
					index: record.key,
				},
			});
			fetch(`${this.props.base_url}categories/${record._id}`, {
				method: "GET",
			})
				.then(response => response.json())
				.then(data => {
					this.setFormFields(data);
				})
				.catch(err => console.error(err));
		} else if (e.key === "2") {
			confirm({
				title: "Are you sure delete this record?",
				onOk() {
					fetch(`${base_url}categories/${record._id}`, {
						method: "DELETE",
					})
						.then(response => response.json())
						.then(data => {
							message.success("Deleted");
						})
						.catch(err => console.error(err));
					deleteCategory(record._id);
				},
			});
		}
	};

	handleEditCancel = e => {
		this.setState({
			visible: false,
		});
	};
	handleEditOK = () => {
		const form = this.formRef.props.form;
		const id = this.state.formItem.id;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}
			fetch(`${this.props.base_url}categories/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			})
				.then(response => response.json())
				.then(data => {
					this.props.updateCategory(data, this.state.formItem.index);
					message.success("Edited");
				})
				.catch(err => console.error(err));
			form.resetFields();
			this.setState({ visible: false });
		});
	};

	saveFormRef = formRef => {
		this.formRef = formRef;
	};

	render() {
		return (
			<div>
				<Table
					dataSource={this.props.categories}
					columns={this.state.columns}
					deleteCategory={this.props.deleteCategory}
					handleAdd={this.handleAdd}
					handleMenuClick={this.handleMenuClick}
				/>
				<ModalComponent
					wrappedComponentRef={this.saveFormRef}
					visible={this.state.visible}
					onOk={this.handleEditOK}
					onCancel={this.handleEditCancel}
					titleModal="Update"
					type={3}
				/>
			</div>
		);
	}
}
