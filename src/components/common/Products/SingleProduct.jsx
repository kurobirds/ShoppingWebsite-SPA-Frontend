import React, { Component, Fragment } from "react";
import moment from "moment";
import styled from "styled-components";
import FormComment from "../../common/Form/formComment";
import SpinnerInputNumber from "../SpinnerInputNumber";
import {
	Carousel,
	Row,
	Col,
	Input,
	Button,
	Divider,
	notification,
	Spin,
	Icon,
	List,
	Avatar,
} from "antd";
const InputGroup = Input.Group,
	antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

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
		this.state = {
			quantityValue: 1,
			product: null,
			Comments: null,
		};
	}

	componentDidMount() {
		this.props.fetchProducts(`${this.props.base_url}products`);
		this.props.fetchCategories(`${this.props.base_url}categories`);
		this.props.fetchProducers(`${this.props.base_url}producers`);

		const id = this.props.match.params.id;
		const request = async () => {
			const response = await fetch(
				`${this.props.base_url}products/${id}`
			);
			const json = await response.json();

			this.setState({ product: json, Comments: json.Comments });
		};

		request();
	}

	updateComment = data => {
		this.setState({ Comments: data });
	};

	onChange = e => {
		const { value } = e.target;
		const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
		if (
			(!isNaN(value) && reg.test(value)) ||
			value === "" ||
			value === "-"
		) {
			const product = this.state.product;
			if (value <= product.Stock_Quantity) {
				this.setState({ quantityValue: Number(value) });
			} else {
				this.setState({ quantityValue: 1 });
				notification.warning({
					message: "Out of Stock",
					description: `Our Stock is ${product.Stock_Quantity}`,
				});
			}
		}
	};

	addProductToCart = product => {
		const infoProduct = product;
		const quantity = this.state.quantityValue;

		const productItem = {
			_id: infoProduct._id,
			Name: infoProduct.Name,
			Image:
				infoProduct.Images[0] ||
				"https://static1.squarespace.com/static/5937e362be659441f72e7c12/t/595120eadb29d60c5983e4a2/1498489067243/Sorry-image-not-available.png",
			Price: infoProduct.Price,
			Stock_Quantity: infoProduct.Stock_Quantity,
		};

		this.props.addCart(productItem, quantity);
	};

	spinnerInputOnChange = (type = 0, product) => {
		const infoProduct = product;
		let quantityValue = this.state.quantityValue;

		switch (type) {
			case 1:
				if (quantityValue > 1) {
					quantityValue--;
				}

				break;

			default:
				if (quantityValue < infoProduct.Stock_Quantity) {
					quantityValue++;
				}

				break;
		}
		this.setState({
			quantityValue,
		});
	};

	render() {
		const product = this.state.product;

		const listImage = [];

		if (!product) {
			return (
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
			);
		}

		for (const index in product.Images) {
			const element = product.Images[index];
			listImage.push(
				<img key={index} src={element} alt={product.Name} />
			);
		}

		if (!listImage[0]) {
			listImage.push(
				<img
					key={0}
					src="https://static1.squarespace.com/static/5937e362be659441f72e7c12/t/595120eadb29d60c5983e4a2/1498489067243/Sorry-image-not-available.png"
					alt={product.Name}
				/>
			);
		}

		const Comments = this.state.Comments.sort(
			(obj1, obj2) => obj1.createdAt - obj2.createdAt
		);

		return (
			<Fragment>
				<Row>
					<Col span={12}>
						<Carousel autoplay swipeToSlide="true">
							{listImage.map(element => element)}
						</Carousel>
					</Col>
					<Col span={12}>
						<Fragment>
							<Name>{product.Name}</Name>
							<Price>{Number(product.Price).formatVND()}</Price>
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
										quantityValue={this.state.quantityValue}
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

							<Divider style={{ marginTop: "30px" }} />
							<Col span={11}>
								<Name>Description</Name>
								<Detail
									dangerouslySetInnerHTML={{
										__html: product.Description,
									}}
								/>
							</Col>
							<Col span={1}>
								<Divider
									type="vertical"
									style={{ height: "200px" }}
								/>
							</Col>

							<Col span={12}>
								<Detail>View: {product.View}</Detail>
								<Detail>Sold: {product.Sold_Quantity}</Detail>
								<Detail>
									Category: {product.Categories_Detail.Name}
								</Detail>
								<Detail>
									Producer: {product.Producer_Detail.Name}
								</Detail>
							</Col>
						</Fragment>
					</Col>
				</Row>
				<Row
					style={{
						padding: "1%",
					}}
				>
					<Divider orientation="left" dashed>
						<Name>Comment</Name>
					</Divider>
					<Col style={{ paddingBottom: "1%" }} span={24}>
						<FormComment
							auth={this.props.auth}
							id={product._id}
							base_url={this.props.base_url}
							updateComment={this.updateComment}
						/>
					</Col>
					<Col span={24}>
						<List
							pagination={{
								size: "small",
								showSizeChanger: true,
								showQuickJumper: true,
							}}
							itemLayout="horizontal"
							dataSource={Comments}
							renderItem={item => (
								<List.Item>
									<List.Item.Meta
										avatar={
											<Avatar size="large" icon="user" />
										}
										title={<b>{item.author}</b>}
										description={item.comment}
									/>
									{moment
										.unix(item.createdAt)
										.format("YYYY-MM-DD HH:mm:ss")}
								</List.Item>
							)}
						/>
					</Col>
				</Row>
			</Fragment>
		);
	}
}
