import React, { Component } from "react";
import Card from "../card";
import { List } from "antd";

import {
	Hits,
	SearchkitComponent,
	Pagination,
	DynamicRangeFilter,
	ResetFilters,
	InputFilter,
	SelectedFilters,
	PaginationSelect,
	RefinementListFilter,
	TermQuery,
} from "searchkit";

class ListProduct extends Component {
	render() {
		const { hits } = this.props;
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
				dataSource={hits}
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

export default class HomeProduct extends SearchkitComponent {
	render() {
		return (
			<React.Fragment>
				<SelectedFilters />
				<InputFilter
					id="product_filter"
					title="Product filter"
					placeholder="Search product"
					searchOnChange={true}
					prefixQueryFields={["Name"]}
					queryFields={["Name"]}
				/>

				<ResetFilters />
				<Hits
					hitsPerPage={100}
					listComponent={
						<ListProduct
							match={this.props.match}
							addCart={this.props.addCart}
						/>
					}
				/>
				<PaginationSelect />
				<Pagination showNumbers={true} />
			</React.Fragment>
		);
	}
}
