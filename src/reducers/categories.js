import {
	CATEGORIES_FETCH_DATA_SUCCESS,
	ADD_CATEGORY,
	DELETE_CATEGORY,
	UPDATE_CATEGORY,
	CATEGORIES_IS_LOADING,
} from "../actions/categories";

export function categoriesIsLoading(state = false, action) {
	switch (action.type) {
	case CATEGORIES_IS_LOADING:
		return action.isLoading;
	default:
		return state;
	}
}

export function categories(state = [], action) {
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
