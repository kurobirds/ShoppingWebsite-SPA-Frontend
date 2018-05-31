import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Carousel, Row, Col, Input, InputNumber, Icon, Button } from "antd";
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
		const infoCard = product[0];
		const quantity = this.state.quantityValue;

		const productItem = {
			_id: infoCard._id,
			Name: infoCard.Name,
		};

		this.props.addCart(productItem, quantity);
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
										<InputGroup compact>
											<Button icon="minus" />
											<Input
												style={{
													width: "100px",
													textAlign: "center",
												}}
												value={this.state.quantityValue}
												defaultValue={
													this.state.quantityValue
												}
												onChange={this.onChange}
												onPressEnter={() =>
													this.addProductToCart(
														product
													)
												}
											/>
											<Button
												icon="plus"
												onClick={() => {
													let quantityValue = this
														.state.quantityValue;
													quantityValue++;
													this.setState({
														quantityValue,
													});
												}}
											/>
										</InputGroup>
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
								<Name>{product[0].Description}</Name>
							</Fragment>
						)}
					</Col>
				</Row>
			</Fragment>
		);
	}
}
