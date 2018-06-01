import React from "react";
import { Button, Input } from "antd";
const InputGroup = Input.Group;

const SpinnerInputNumber = props => {
	const product = props.product;
	const quantityValue = props.quantityValue;
	return (
		<InputGroup compact>
			<Button
				icon="minus"
				onClick={() => {
					props.spinnerInputOnChange(1, product);
				}}
			/>
			<Input
				style={{
					width: "100px",
					textAlign: "center",
				}}
				value={quantityValue}
				defaultValue={quantityValue}
				onChange={props.onChange}
				onPressEnter={() => props.addProductToCart(product)}
			/>
			<Button
				icon="plus"
				onClick={() => {
					props.spinnerInputOnChange(0, product);
				}}
			/>
		</InputGroup>
	);
};

export default SpinnerInputNumber;
