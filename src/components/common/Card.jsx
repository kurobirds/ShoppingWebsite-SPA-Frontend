import React from "react";
import { Card, Icon, Popconfirm, notification } from "antd";
import Modal from "./Modal";
const { Meta } = Card;

class CardItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
		};
	}

	openNotification = (type, message) => {
		notification[type]({
			message,
			duration: 4,
		});
	};

	// Delete
	handleDeleteOK = e => {
		const id = this.props.infoCard._id;
		fetch(`${this.props.endpoint}/${id}`, {
			method: "DELETE",
		})
			.then(response => response.json())
			.then(() => {
				this.props.deleteCard(id);
				this.openNotification("success", "Deleted character");
			})
			.catch(err => this.openNotification("error", err));
	};
	handleDeleteCancel = e => {
		console.log("Clicked cancel button");
	};

	// Edit
	setFormFields = data => {
		this.formRef.props.form.setFieldsValue({
			title: data.title,
			description: data.description,
			images: data.images,
		});
	};
	// Get card from and set all field to form
	showEditModal = () => {
		this.setState({ visible: true });
		fetch(`${this.props.endpoint}/${this.props.infoCard._id}`, {
			method: "GET",
		})
			.then(response => response.json())
			.then(data => {
				this.setFormFields(data);
			})
			.catch(err => console.error(err));
	};
	handleEditCancel = e => {
		this.setState({
			visible: false,
		});
	};
	handleEditOK = () => {
		const form = this.formRef.props.form;
		const id = this.props.infoCard._id;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}

			fetch(`${this.props.endpoint}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			})
				.then(response => response.json())
				.then(data => {
					this.props.editCard(data, this.props.index);
					this.openNotification("success", "Edited character");
				})
				.catch(err => this.openNotification("error", err));
			form.resetFields();
			this.setState({ visible: false });
		});
	};
	saveFormRef = formRef => {
		this.formRef = formRef;
	};

	render() {
		return (
			<Card
				cover={
					<img
						alt={this.props.title}
						src={this.props.infoCard.images}
						height="225"
						width="348"
					/>
				}
				actions={[
					<Icon
						type="edit"
						style={{ color: "blue" }}
						onClick={this.showEditModal}
					/>,
					<Popconfirm
						title="Are you sure delete this card?"
						onConfirm={this.handleDeleteOK}
						onCancel={this.handleDeleteCancel}
						okText="Yes"
						cancelText="No"
					>
						<Icon type="delete" style={{ color: "red" }} />
					</Popconfirm>,
				]}
			>
				<Meta
					title={this.props.infoCard.title}
					description={this.props.infoCard.description}
				/>
				<Modal
					wrappedComponentRef={this.saveFormRef}
					visible={this.state.visible}
					onOk={this.handleEditOK}
					onCancel={this.handleEditCancel}
					titleModal="Edit"
				/>
			</Card>
		);
	}
}

export default CardItem;
