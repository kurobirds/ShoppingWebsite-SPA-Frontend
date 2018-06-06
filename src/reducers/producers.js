import {
	PRODUCERS_FETCH_DATA_SUCCESS,
	ADD_PRODUCER,
	DELETE_PRODUCER,
	UPDATE_PRODUCER,
	PRODUCERS_IS_LOADING,
} from "../actions/producers";

export function producersIsLoading(state = false, action) {
	switch (action.type) {
	case PRODUCERS_IS_LOADING:
		return action.isLoading;
	default:
		return state;
	}
}
export function producers(state = [], action) {
	switch (action.type) {
	case PRODUCERS_FETCH_DATA_SUCCESS:
		return action.payload;
	case ADD_PRODUCER:
		return [...state, action.payload];
	case DELETE_PRODUCER:
		return state.filter(producer => producer._id !== action.payload);
	case UPDATE_PRODUCER: {
		const newState = [...state];

		const index = newState.findIndex(
			element => element._id === action.id
		);

		newState[index] = action.producer;

		return newState;
	}
	default:
		return state;
	}
}
