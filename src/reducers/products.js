import {
	PRODUCTS_FETCH_DATA_SUCCESS,
	ADD_PRODUCT,
	DELETE_PRODUCT,
	UPDATE_PRODUCT,
} from "../actions/products";
export default function products(state = [], action) {
	switch (action.type) {
	case PRODUCTS_FETCH_DATA_SUCCESS:
		return action.payload;
	case ADD_PRODUCT:
		return [...state, action.payload];
	case DELETE_PRODUCT:
		return state.filter(product => product._id !== action.payload);
	case UPDATE_PRODUCT: {
		const newState = [...state];
		newState[action.index] = action.product;
		return newState;
	}
	default:
		return state;
	}
}
