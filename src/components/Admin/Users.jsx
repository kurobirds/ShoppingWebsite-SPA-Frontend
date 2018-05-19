import React, { Component } from "react";
import Table from "../common/Table";
import ModalComponent from "../common/Modal";

import { Modal, message } from "antd";
const { confirm } = Modal;

export default class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formItem: {
				id: null,
				index: null,
			},
			visible: false,
			columns: [
				{
					title: "Username",
					dataIndex: "username",
					key: "username",
				},
				{
					title: "Password",
					dataIndex: "password",
					key: "password",
				},
				{
					title: "Name",
					dataIndex: "name",
					key: "name",
				},
				{
					title: "Email",
					dataIndex: "email",
					key: "email",
				},
				{
					title: "Day of Birth",
					dataIndex: "DOB",
					key: "DOB",
				},
				{
					title: "Permission",
					dataIndex: "permission",
					key: "permission",
				},
			],
		};
	}

	componentDidMount() {
		this.props.fetchData(`${this.props.base_url}users`);
	}

	handleAdd = () => {
		console.log("handleAdd");
	};

	setFormFields = data => {
		this.formRef.props.form.setFieldsValue({
			username: data.username,
			password: data.password,
			name: data.name,
			email: data.email,
			DOB: data.DOB,
			permission: data.permission,
		});
	};

	handleMenuClick = (record, e) => {
		const deleteUser = id => this.props.deleteUser(id);
		const base_url = this.props.base_url;
		if (e.key === "1") {
			this.setState({
				visible: true,
				formItem: {
					id: record._id,
					index: record.key,
				},
			});
			fetch(`${this.props.base_url}users/${record._id}`, {
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
					fetch(`${base_url}users/${record._id}`, {
						method: "DELETE",
					})
						.then(response => response.json())
						.then(data => {
							message.success("Deleted");
						})
						.catch(err => console.error(err));
					deleteUser(record._id);
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
			fetch(`${this.props.base_url}users/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			})
				.then(response => response.json())
				.then(data => {
					this.props.updateUser(data, this.state.formItem.index);
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
					dataSource={this.props.users}
					columns={this.state.columns}
					deleteUsers={this.props.deleteUsers}
					handleAdd={this.handleAdd}
					handleMenuClick={this.handleMenuClick}
				/>
				<ModalComponent
					wrappedComponentRef={this.saveFormRef}
					visible={this.state.visible}
					onOk={this.handleEditOK}
					onCancel={this.handleEditCancel}
					titleModal="Update"
					type={5}
				/>
			</div>
		);
	}
}
