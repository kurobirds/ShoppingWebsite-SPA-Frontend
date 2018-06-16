import React, { Component } from "react";
import decode from "jwt-decode";
import moment from "moment";
import Table from "../common/Table";
import ModalComponent from "../common/Modal";

import { Modal, message } from "antd";
const { confirm } = Modal;

export default class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			endpoint: `${this.props.base_url}users`,
			formItem: {
				id: null,
				index: null,
			},
			visible: false,
			columns: [
				{
					title: "Username",
					dataIndex: "Username",
					key: "Username",
				},
				{
					title: "Password",
					dataIndex: "Password",
					key: "Password",
				},
				{
					title: "Name",
					dataIndex: "Name",
					key: "Name",
				},
				{
					title: "Email",
					dataIndex: "Email",
					key: "Email",
				},
				{
					title: "Day of Birth",
					dataIndex: "DOB",
					key: "DOB",
				},
				{
					title: "Permission",
					dataIndex: "Permission",
					key: "Permission",
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

			// Moment to Unix
			values.DOB = values.DOB.unix();

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
					data.DOB = moment.unix(data.DOB).format("YYYY-MM-DD");

					type
						? this.props.updateUser(data, id)
						: this.props.addUser(data);

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
			Username: data.Username,
			Password: data.Password,
			Name: data.Name,
			Email: data.Email,
			DOB: moment.unix(data.DOB),
			Permission: data.Permission,
		});
	};

	handleMenuClick = (record, e) => {
		const deleteUser = id => this.props.deleteUser(id);
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
			fetch(`${endpoint}/${record._id}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then(response => response.json())
				.then(data => {
					this.setFormFields(data);
				})
				.catch(err => console.error(err));
		} else if (e.key === "2") {
			const decoded = decode(localStorage.token);
			if (decoded._id !== record._id) {
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
						deleteUser(record._id);
					},
					maskClosable: true,
				});
			} else {
				message.error("Can't delete current user");
			}
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
					dataSource={this.props.users}
					columns={this.state.columns}
					deleteUsers={this.props.deleteUsers}
					handleAdd={this.handleAdd}
					handleMenuClick={this.handleMenuClick}
					loading={this.props.usersIsLoading}
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
					type={5}
				/>
			</div>
		);
	}
}
