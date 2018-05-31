import React, { Component, Fragment } from "react";
import { Carousel, Row, Col } from "antd";
import styled from "styled-components";

const Title = styled.h1`
	font-size: 26px;
	font-weight: 450;
	line-height: 1.125;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
		Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Detail = styled.p`
	font-size: 16px;
	font-weight: 400px;
`;

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
				<Row>
					<Col span={12}>
						<Carousel autoplay swipeToSlide="true">
							{listImage.map(element => element)}
						</Carousel>
					</Col>
					<Col span={12}>
						{!product[0] ? null : (
							<Fragment>
								<Title>{product[0].Name}</Title>
								<Title>
									{Number(product[0].Price).formatVND()}
								</Title>
								<Title
									style={{
										marginTop: "30px",
										paddingTop: "30px",
										borderTop: "1px solid #eee",
									}}
								>
									Description
								</Title>
								<Detail>{product[0].Description}</Detail>
							</Fragment>
						)}
					</Col>
				</Row>
			</Fragment>
		);
	}
}
