import { ADD_CART, UPDATE_CART, DELETE_CART } from "../actions/carts";

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
				const newQuantity = currentQuantity + action.quantity;
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
		}

		localStorage.setItem("carts", JSON.stringify(newState));

		return newState;
	}

	case UPDATE_CART:
		return state.filter(cart => cart._id !== action.payload);
	case DELETE_CART: {
		const newState = [...state];
		newState[action.index] = action.category;
		return newState;
	}
	default:
		return state;
	}
}
