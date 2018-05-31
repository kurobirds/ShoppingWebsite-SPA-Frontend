export const ADD_CART = "ADD_CART";
export const DELETE_CART = "DELETE_CART";
export const UPDATE_CART = "UPDATE_CART";

export function addCart(cart) {
	return {
		type: ADD_CART,
		payload: cart,
	};
}

export function updateCart(cart, index) {
	return {
		type: UPDATE_CART,
		cart,
		index,
	};
}

export function deleteCart(id) {
	return {
		type: DELETE_CART,
		payload: id,
	};
}
