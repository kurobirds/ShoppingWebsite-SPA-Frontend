import {
	ORDERS_FETCH_DATA_SUCCESS,
	UPDATE_ORDER,
	ORDERS_IS_LOADING,
} from "../actions/order";

export function ordersIsLoading(state = false, action) {
	switch (action.type) {
	case ORDERS_IS_LOADING:
		return action.isLoading;
	default:
		return state;
	}
}

export function orders(state = [], action) {
	switch (action.type) {
	case ORDERS_FETCH_DATA_SUCCESS:
		return action.payload;

	case UPDATE_ORDER: {
		const newState = [...state];

		const index = newState.findIndex(
			element => element._id === action.id
		);

		newState[index] = action.order;

		return newState;
	}
	default:
		return state;
	}
}
