import React, { Component } from "react";
import Card from "../card";
import { List } from "antd";

import { ReactiveList, SelectedFilters } from "@appbaseio/reactivesearch";

class ListProduct extends Component {
	render() {
		return (
			<List
				pagination={{
					showQuickJumper: true,
					onChange: page => {
						console.log(page);
					},
					pageSize: 8,
				}}
				grid={{
					gutter: 16,
					xs: 1,
					sm: 2,
					md: 4,
					lg: 4,
					xl: 4,
					xxl: 4,
				}}
				dataSource={this.props.cards}
				renderItem={card => (
					<List.Item>
						<Card
							match={this.props.match}
							infoCard={card}
							addCart={this.props.addCart}
						/>
					</List.Item>
				)}
			/>
		);
	}
}

export default class HomeProduct extends Component {
	render() {
		return (
			<React.Fragment>
				<SelectedFilters
					showClearAll={true}
					clearAllLabel="Clear filters"
				/>
				<ReactiveList
					componentId="ListCard"
					react={{
						and: [
							"PriceSensor",
							"CategoriesSensor",
							"SearchSensor",
							"ProducerSensor",
						],
					}}
					dataField="_id"
					sortBy="asc"
					loader="Loading Results.."
					pagination={false}
					onAllData={data => {
						return <ListProduct cards={data} />;
					}}
					size={100}
				/>
			</React.Fragment>
		);
	}
}
