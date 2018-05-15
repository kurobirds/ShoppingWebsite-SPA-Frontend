import {
	CATEGORIES_FETCH_DATA_SUCCESS,
	ADD_CATEGORY,
	DELETE_CATEGORY,
	UPDATE_CATEGORY,
} from "../actions/categories";
export default function categories(state = [], action) {
	switch (action.type) {
	case CATEGORIES_FETCH_DATA_SUCCESS:
		return action.payload;
	case ADD_CATEGORY:
		return [...state, action.payload];
	case DELETE_CATEGORY:
		return state.filter(category => category._id !== action.payload);
	case UPDATE_CATEGORY: {
		const newState = [...state];
		newState[action.index] = action.category;
		return newState;
	}
	default:
		return state;
	}
}
