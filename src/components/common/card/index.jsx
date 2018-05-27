import React, { Component } from "react";
import "./Card.css";

export default class Card extends Component {
	render() {
		return (
			<figure className="snip1268">
				<div className="image">
					<img
						src="https://img.showwall.com/wp/grimgar_of_fantasy_and_ash/free/312150.jpg"
						alt={this.props.infoCard.Name}
					/>
					<div className="icons">
						<a onClick={() => console.log(this.props.index)}>
							Read more
						</a>
					</div>
					<a className="add-to-cart">Add to Cart</a>
				</div>
				<figcaption>
					<h2>{this.props.infoCard.Name}</h2>
					<div className="price">${this.props.infoCard.Price}</div>
				</figcaption>
			</figure>
		);
	}
}
