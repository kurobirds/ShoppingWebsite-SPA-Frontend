import React, { Component } from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export default class Card extends Component {
	render() {
		const productLink = `/product/${this.props.infoCard._id}`;
		return (
			<figure className="snip1268">
				<div className="image">
					<img
						src={
							this.props.infoCard.Images[0] ||
							"https://static1.squarespace.com/static/5937e362be659441f72e7c12/t/595120eadb29d60c5983e4a2/1498489067243/Sorry-image-not-available.png"
						}
						alt={this.props.infoCard.Name}
					/>
					<div className="icons">
						<Link to={productLink}>Read more</Link>
					</div>
					<div
						className="add-to-cart"
						onClick={() => {
							const infoCard = this.props.infoCard;

							const product = {
								_id: infoCard._id,
								Name: infoCard.Name,
							};

							this.props.addCart(product, 1);
						}}
					>
						Add to Cart
					</div>
				</div>
				<figcaption>
					<h2>{this.props.infoCard.Name}</h2>
					<div className="price">
						{Number(this.props.infoCard.Price).formatVND()}
					</div>
				</figcaption>
			</figure>
		);
	}
}
