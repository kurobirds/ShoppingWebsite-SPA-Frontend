import { ADD_CART, UPDATE_CART, DELETE_CART } from "../actions/carts";
import { message } from "antd";
export default function carts(
	state = JSON.parse(localStorage.carts || "[]"),
	action
) {
	switch (action.type) {
	case ADD_CART: {
		const newState = [...state];

		let duplicate = false;

		for (const index in newState) {
			if (newState[index]._id === action.cart._id) {
				duplicate = true;

				// Quantity
				const currentQuantity = newState[index].quantity;
				let newQuantity = currentQuantity + action.quantity;

				if (newQuantity > newState[index].Sell_Quantity) {
					message.warning("Out of stock");
					newQuantity = currentQuantity;
				} else {
					message.success("Add Successfully");
				}
				newState[index].quantity = newQuantity;

				// Price
				const basePrice = action.cart.Price;
				const newPrice = basePrice * newQuantity;
				newState[index].Price = newPrice;

				break;
			}
		}

		if (!duplicate) {
			action.cart.quantity = action.quantity || 1;
			newState.push(action.cart);
			message.success("Add Successfully");
		}

		localStorage.setItem("carts", JSON.stringify(newState));

		return newState;
	}
	case UPDATE_CART: {
		const newState = [...state];
		const index = newState.findIndex(
			element => element._id === action.id
		);

		newState[index] = action.cart;

		localStorage.setItem("carts", JSON.stringify(newState));

		message.success("Update Successfully");

		return newState;
	}
	case DELETE_CART: {
		let newState = state.filter(cart => cart._id !== action.payload);
		localStorage.setItem("carts", JSON.stringify(newState));
		message.success("Delete Successfully");
		return newState;
	}

	default:
		return state;
	}
}
