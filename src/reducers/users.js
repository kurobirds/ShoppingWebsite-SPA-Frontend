import {
	USERS_FETCH_DATA_SUCCESS,
	ADD_USER,
	DELETE_USER,
	UPDATE_USER,
	USERS_IS_LOADING,
} from "../actions/users";

export function usersIsLoading(state = false, action) {
	switch (action.type) {
	case USERS_IS_LOADING:
		return action.isLoading;
	default:
		return state;
	}
}

export function users(state = [], action) {
	switch (action.type) {
	case USERS_FETCH_DATA_SUCCESS:
		return action.payload;
	case ADD_USER:
		return [...state, action.payload];
	case DELETE_USER:
		return state.filter(user => user._id !== action.payload);
	case UPDATE_USER: {
		const newState = [...state];

		const index = newState.findIndex(
			element => element._id === action.id
		);

		newState[index] = action.user;

		return newState;
	}
	default:
		return state;
	}
}
