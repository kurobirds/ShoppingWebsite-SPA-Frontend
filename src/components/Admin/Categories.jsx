import React, { Component } from "react";
import Table from "../common/Table";
import ModalComponent from "../common/Modal";

import { Modal, message } from "antd";
const { confirm } = Modal;

export default class Categories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			endpoint: `${this.props.base_url}categories`,
			formItem: {
				id: null,
				index: null,
			},
			columns: [
				{
					title: "Name",
					dataIndex: "Name",
					key: "Name",
				},
			],
			modalTitle: null,
		};
	}

	componentDidMount() {
		this.props.fetchData(`${this.state.endpoint}`);
	}

	modalEvent = (name, type) => {
		const form = this.formRef.props.form;
		const id = this.state.formItem.id;
		const token = localStorage.token;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}
			fetch(`${this.state.endpoint}${type ? `/${id}` : ""}`, {
				method: type ? "PUT" : "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(values),
			})
				.then(response => response.json())
				.then(data => {
					type
						? this.props.updateCategory(data, id)
						: this.props.addCategory(data);

					message.success(`${name}d`);
				})
				.catch(err => console.error(err));
			form.resetFields();
			this.setState({ visible: false });
		});
	};

	handleAdd = () => {
		this.setState({
			visible: true,
			modalTitle: "Create",
		});

		this.formRef.props.form.resetFields();
	};

	handleAddOK = () => {
		this.modalEvent("Create", 0);
	};

	setFormFields = data => {
		this.formRef.props.form.setFieldsValue({
			Name: data.Name,
		});
	};

	handleMenuClick = (record, e) => {
		const deleteCategory = id => this.props.deleteCategory(id);
		const endpoint = this.state.endpoint;
		const token = localStorage.token;
		if (e.key === "1") {
			this.setState({
				visible: true,
				modalTitle: "Update",
				formItem: {
					id: record._id,
					index: record.key,
				},
			});
			fetch(`${endpoint}/${record._id}`)
				.then(response => response.json())
				.then(data => {
					this.setFormFields(data);
				})
				.catch(err => console.error(err));
		} else if (e.key === "2") {
			confirm({
				title: "Are you sure delete this record?",
				onOk() {
					fetch(`${endpoint}/${record._id}`, {
						method: "DELETE",
						headers: {
							Authorization: `Bearer ${token}`,
						},
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
		this.modalEvent("Update", 1);
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
					loading={this.props.categoriesIsLoading}
				/>
				<ModalComponent
					wrappedComponentRef={this.saveFormRef}
					visible={this.state.visible}
					onOk={
						this.state.modalTitle === "Create"
							? this.handleAddOK
							: this.handleEditOK
					}
					onCancel={this.handleEditCancel}
					titleModal={this.state.modalTitle}
					type={3}
				/>
			</div>
		);
	}
}
