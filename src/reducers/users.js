import {
	USERS_FETCH_DATA_SUCCESS,
	ADD_USER,
	DELETE_USER,
	UPDATE_USER,
} from "../actions/users";
export default function users(state = [], action) {
	switch (action.type) {
	case USERS_FETCH_DATA_SUCCESS:
		return action.payload;
	case ADD_USER:
		return [...state, action.payload];
	case DELETE_USER:
		return state.filter(user => user._id !== action.payload);
	case UPDATE_USER: {
		const newState = [...state];
		newState[action.index] = action.user;
		return newState;
	}
	default:
		return state;
	}
}
