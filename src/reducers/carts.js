import { ADD_CART, UPDATE_CART, DELETE_CART } from "../actions/carts";

export default function carts(
	state = JSON.parse(localStorage.carts || "[]"),
	action
) {
	switch (action.type) {
	case ADD_CART:
		return [...state, action.payload];
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
