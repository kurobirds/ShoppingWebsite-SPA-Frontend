import React from "react";
import { Modal, Form, Input } from "antd";
const FormItem = Form.Item;

const ChangePassword = Form.create()(
	class extends React.Component {
		handleUpdate = e => {
			e.preventDefault();

			const form = this.props.form;
			const id = this.props.userInfo._id;
			const token = localStorage.token;

			form.validateFields((err, values) => {
				if (err) {
					return;
				}

				fetch(`${this.props.endpoint}${id}/password`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(values),
				})
					.then(response => response.json())
					.then(data => {
						console.log(data);
						form.resetFields();
						this.props.closeModal();
					})
					.catch(err => console.error(err));
			});
		};

		handleCancel = () => {
			const form = this.props.form;
			form.resetFields();
			this.props.closeModal();
		};

		render() {
			const { visible } = this.props;
			const { getFieldDecorator } = this.props.form;
			return (
				<Modal
					visible={visible}
					title="Edit Passoword"
					okText="Update"
					onCancel={this.handleCancel}
					onOk={this.handleUpdate}
				>
					<Form layout="vertical">
						<FormItem label="Old Password">
							{getFieldDecorator("OldPass", {
								rules: [
									{
										required: true,
										message: "This field is required",
									},
								],
							})(<Input />)}
						</FormItem>
						<FormItem label="New Password">
							{getFieldDecorator("NewPass", {
								rules: [
									{
										required: true,
										message: "This field is required",
									},
								],
							})(<Input />)}
						</FormItem>
						<FormItem label="Confirm New Password">
							{getFieldDecorator("ConNewPass", {
								rules: [
									{
										required: true,
										message: "This field is required",
									},
								],
							})(<Input />)}
						</FormItem>
					</Form>
				</Modal>
			);
		}
	}
);

export default ChangePassword;
