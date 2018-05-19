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
					title: "Name",
					dataIndex: "ProName",
					key: "ProName",
				},
				{
					title: "Tiny Description",
					dataIndex: "TinyDes",
					key: "TinyDes",
				},
				{
					title: "Price",
					dataIndex: "Price",
					key: "Price",
				},
				{
					title: "CatID",
					dataIndex: "CatID",
					key: "CatID",
				},
				{
					title: "Quantity",
					dataIndex: "Quantity",
					key: "Quantity",
				},
				{
					title: "Amount",
					dataIndex: "SLB",
					key: "Amount",
				},
				{
					title: "LX",
					dataIndex: "LX",
					key: "LX",
				},
				{
					title: "XX",
					dataIndex: "XX",
					key: "XX",
				},
				{
					title: "SLAnh",
					dataIndex: "SLAnh",
					key: "SLAnh",
				},
			],
		};
	}

	componentDidMount() {
		this.props.fetchData(`${this.props.base_url}products`);
	}

	handleAdd = () => {
		console.log("handleAdd");
	};

	setFormFields = data => {
		this.formRef.props.form.setFieldsValue({
			ProName: data.ProName,
			TinyDes: data.TinyDes,
			Price: data.Price,
			CatID: data.CatID,
			Quantity: data.Quantity,
			SLB: data.SLB,
			LX: data.LX,
			XX: data.XX,
			SLAnh: data.SLAnh,
		});
	};

	handleMenuClick = (record, e) => {
		const deleteProduct = id => this.props.deleteProduct(id);
		const base_url = this.props.base_url;
		if (e.key === "1") {
			this.setState({
				visible: true,
				formItem: {
					id: record._id,
					index: record.key,
				},
			});
			fetch(`${this.props.base_url}products/${record._id}`, {
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
					fetch(`${base_url}products/${record._id}`, {
						method: "DELETE",
					})
						.then(response => response.json())
						.then(data => {
							message.success("Deleted");
						})
						.catch(err => console.error(err));
					deleteProduct(record._id);
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
			fetch(`${this.props.base_url}products/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			})
				.then(response => response.json())
				.then(data => {
					this.props.updateProduct(data, this.state.formItem.index);
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
					dataSource={this.props.products}
					columns={this.state.columns}
					deleteProduct={this.props.deleteProduct}
					handleAdd={this.handleAdd}
					handleMenuClick={this.handleMenuClick}
				/>
				<ModalComponent
					wrappedComponentRef={this.saveFormRef}
					visible={this.state.visible}
					onOk={this.handleEditOK}
					onCancel={this.handleEditCancel}
					titleModal="Update"
					type={2}
				/>
			</div>
		);
	}
}
