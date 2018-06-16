import React from "react";

import moment from "moment";

import { Modal, Form, Input, DatePicker } from "antd";
const FormItem = Form.Item;

const EditDetails = Form.create({
	mapPropsToFields(props) {
		return {
			Name: Form.createFormField({
				value: props.userInfo.Name,
			}),
			Email: Form.createFormField({
				value: props.userInfo.Email,
			}),
			DOB: Form.createFormField({
				value: moment.unix(props.userInfo.DOB),
			}),
		};
	},
})(
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

				// Moment to Unix
				values.DOB = values.DOB.unix();

				fetch(`${this.props.endpoint}${id}/details`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(values),
				})
					.then(response => response.json())
					.then(data => {
						data.DOB = moment.unix(data.DOB).format("YYYY-MM-DD");
						form.resetFields();
						this.props.closeModal();
						console.log(data);
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
			const dateFormat = "YYYY-MM-DD";
			const { visible } = this.props;
			const { getFieldDecorator } = this.props.form;
			return (
				<Modal
					visible={visible}
					title="Edit Details"
					okText="Update"
					onCancel={this.handleCancel}
					onOk={this.handleUpdate}
				>
					<Form layout="vertical">
						<FormItem label="Full Name">
							{getFieldDecorator("Name", {
								rules: [
									{
										required: true,
										message: "This field is required",
									},
								],
							})(<Input />)}
						</FormItem>
						<FormItem label="Email">
							{getFieldDecorator("Email", {
								rules: [
									{
										required: true,
										message: "This field is required",
									},
								],
							})(<Input type="textarea" />)}
						</FormItem>
						<FormItem label="Day of Birth">
							{getFieldDecorator("DOB", {
								rules: [
									{
										required: true,
										message: "This field is required",
									},
								],
							})(<DatePicker format={dateFormat} />)}
						</FormItem>
					</Form>
				</Modal>
			);
		}
	}
);

export default EditDetails;
