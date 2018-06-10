import React, { Component } from "react";
import Card from "../card";
import { ReactiveList, SelectedFilters } from "@appbaseio/reactivesearch";
import { List, Spin, Icon } from "antd";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class ListProduct extends Component {
	render() {
		return (
			<List
				pagination={{
					showQuickJumper: true,
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
					showResultStats={false}
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
					loader={
						<div
							style={{
								textAlign: "center",
								background: "rgba(0,0,0,0.05)",
								borderRadius: "4px",
								marginBottom: "20px",
								padding: "30px 50px",
								margin: "20px 0",
							}}
						>
							<Spin indicator={antIcon} size="large" />
						</div>
					}
					pagination={false}
					onAllData={data => {
						return (
							<ListProduct
								cards={data}
								match={this.props.match}
								addCart={this.props.addCart}
							/>
						);
					}}
					size={100}
				/>
			</React.Fragment>
		);
	}
}
