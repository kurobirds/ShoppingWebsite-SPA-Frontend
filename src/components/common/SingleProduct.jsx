import React, { Component, Fragment } from "react";
export default class Product extends Component {
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
		console.log(product);
		if (product.length > 0) {
			for (let i = 0; i < product[0].Images.length; i++) {
				const element = product[0].Images[i];
				listImage.push(
					<img
						key={i}
						style={{
							height: "220px",
							width: "320px",
						}}
						src={element}
					/>
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
				{listImage.map(element => element)}
			</Fragment>
		);
	}
}
