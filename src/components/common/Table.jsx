import React, { Component } from "react";
import { Table, Button } from "antd";
import DropOption from "../common/DropOption";

export default class TableOption extends Component {
	render() {
		const columns = [
			...this.props.columns,
			{
				title: "Operation",
				dataIndex: "operation",
				width: 100,
				render: (text, record) => {
					return (
						<div>
							<DropOption
								onMenuClick={e =>
									this.props.handleMenuClick(record, e)
								}
								menuOptions={[
									{ key: "1", name: "Update" },
									{ key: "2", name: "Delete" },
								]}
							/>
						</div>
					);
				},
			},
		];

		return (
			<div>
				<Button
					className="editable-add-btn"
					onClick={this.props.handleAdd}
				>
					Add
				</Button>
				<Table
					rowKey="_id"
					bordered
					dataSource={this.props.dataSource}
					columns={columns}
					loading={this.props.loading}
				/>
			</div>
		);
	}
}
