import React, { Component, Fragment } from "react";
import { Carousel } from "antd";

export default class SingleProduct extends Component {
	componentDidMount() {
		this.props.fetchProducts(`${this.props.base_url}products`);
		this.props.fetchCategories(`${this.props.base_url}categories`);
		this.props.fetchProducers(`${this.props.base_url}producers`);
	}

	render() {
		const product = this.props.products.filter(
			element => element._id === this.props.match.params.id
		);
		const listImage = [];
		if (product.length > 0) {
			for (const index in product[0].Images) {
				const element = product[0].Images[index];
				listImage.push(
					<img key={index} src={element} alt={product[0].Name} />
				);
			}
		}

		return (
			<Fragment>
				{product[0] ? `ID: ${product[0]._id}` : ""}
				<br />
				{product[0] ? `Name: ${product[0].Name}` : ""}
				<br />
				{product[0] ? `Description: ${product[0].Description}` : ""}
				<br />
				{product[0] ? `Price: ${product[0].Price}` : ""}
				<br />
				{product[0] ? `Quantity: ${product[0].Quantity}` : ""}
				<br />
				{product[0] ? `Sell_Quantity: ${product[0].Sell_Quantity}` : ""}
				<br />
				<Carousel autoplay swipeToSlide="true">
					{listImage.map(element => element)}
				</Carousel>
			</Fragment>
		);
	}
}
