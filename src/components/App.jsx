import React, { Component } from "react";
import { List } from "antd";
import Card from "./common/card";

export default class App extends Component {
	componentDidMount() {
		this.props.fetchProducts(`${this.props.base_url}products`);
		this.props.fetchCategories(`${this.props.base_url}categories`);
		this.props.fetchProducers(`${this.props.base_url}producers`);
	}
	render() {
		return (
			<List
				pagination={{
					showQuickJumper: true,
					onChange: page => {
						console.log(page);
					},
					pageSize: 12,
				}}
				grid={{
					gutter: 16,
					xs: 1,
					sm: 2,
					md: 4,
					lg: 4,
					xl: 6,
					xxl: 6,
				}}
				dataSource={this.props.products}
				renderItem={(card, index) => (
					<List.Item>
						<Card infoCard={card} index={index} />
					</List.Item>
				)}
			/>
		);
	}
}
