import {
	PRODUCTS_FETCH_DATA_SUCCESS,
	ADD_PRODUCT,
	DELETE_PRODUCT,
	UPDATE_PRODUCT,
	PRODUCTS_IS_LOADING,
} from "../actions/products";

export function productsIsLoading(state = false, action) {
	switch (action.type) {
	case PRODUCTS_IS_LOADING:
		return action.isLoading;
	default:
		return state;
	}
}

export function products(state = [], action) {
	switch (action.type) {
	case PRODUCTS_FETCH_DATA_SUCCESS:
		return action.payload;
	case ADD_PRODUCT:
		return [...state, action.payload];
	case DELETE_PRODUCT:
		return state.filter(product => product._id !== action.payload);
	case UPDATE_PRODUCT: {
		const newState = [...state];

		const index = newState.findIndex(
			element => element._id === action.id
		);

		newState[index] = action.product;

		return newState;
	}
	default:
		return state;
	}
}
