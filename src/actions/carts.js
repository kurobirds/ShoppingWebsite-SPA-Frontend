export const ADD_CART = "ADD_CART";
export const DELETE_CART = "DELETE_CART";
export const UPDATE_CART = "UPDATE_CART";
export const CLEAN_CART = "CLEAN_CART";

export function addCart(cart, quantity) {
	return {
		type: ADD_CART,
		cart,
		quantity,
	};
}

export function updateCart(cart, id) {
	return {
		type: UPDATE_CART,
		cart,
		id,
	};
}

export function deleteCart(id) {
	return {
		type: DELETE_CART,
		payload: id,
	};
}

export function cleanCart() {
	return {
		type: CLEAN_CART,
	};
}
