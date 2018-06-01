import React, { Component, Fragment } from "react";
import styled from "styled-components";
import SpinnerInputNumber from "../SpinnerInputNumber";
import { Carousel, Row, Col, Input, Button } from "antd";
const InputGroup = Input.Group;

const Name = styled.h1`
	font-size: 26px;
	font-weight: 400;
	line-height: 1.125;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
		Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Price = styled(Name)`
	font-size: 18px;
	font-weight: 500;
`;

const Detail = styled.p`
	font-size: 16px;
	font-weight: 400px;
`;

export default class SingleProduct extends Component {
	constructor(props) {
		super(props);
		this.state = { quantityValue: 1 };
	}
	componentDidMount() {
		this.props.fetchProducts(`${this.props.base_url}products`);
		this.props.fetchCategories(`${this.props.base_url}categories`);
		this.props.fetchProducers(`${this.props.base_url}producers`);
	}

	onChange = e => {
		const { value } = e.target;
		const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
		if (
			(!isNaN(value) && reg.test(value)) ||
			value === "" ||
			value === "-"
		) {
			this.setState({ quantityValue: Number(value) });
		}
	};

	addProductToCart = product => {
		const infoProduct = product[0];
		const quantity = this.state.quantityValue;

		const productItem = {
			_id: infoProduct._id,
			Name: infoProduct.Name,
		};

		this.props.addCart(productItem, quantity);
	};

	spinnerInputOnChange = (type = 0, product) => {
		const infoProduct = product[0];
		let quantityValue = this.state.quantityValue;

		switch (type) {
			case 1:
				if (quantityValue > 1) {
					quantityValue--;
				}

				break;

			default:
				if (quantityValue < infoProduct.Quantity) {
					quantityValue++;
				}

				break;
		}
		this.setState({
			quantityValue,
		});
	};

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
								<Name>{product[0].Name}</Name>
								<Price>
									{Number(product[0].Price).formatVND()}
								</Price>
								<Name
									style={{
										marginTop: "24px",
									}}
								>
									Quantity
								</Name>
								<InputGroup compact>
									<Col span={6}>
										<SpinnerInputNumber
											product={product}
											quantityValue={
												this.state.quantityValue
											}
											onChange={this.onChange}
											spinnerInputOnChange={
												this.spinnerInputOnChange
											}
										/>
									</Col>
									<Col span={6}>
										<Button
											style={{
												width: "100%",
											}}
											type="primary"
											onClick={() =>
												this.addProductToCart(product)
											}
										>
											ADD TO CART
										</Button>
									</Col>
								</InputGroup>
								<Name
									style={{
										marginTop: "30px",
										paddingTop: "30px",
										borderTop: "1px solid #eee",
									}}
								>
									Description
								</Name>
								<Detail>{product[0].Description}</Detail>
							</Fragment>
						)}
					</Col>
				</Row>
			</Fragment>
		);
	}
}
