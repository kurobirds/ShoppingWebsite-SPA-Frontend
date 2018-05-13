import { CATEGORIES_FETCH_DATA_SUCCESS } from "../actions/categories";
export default function categories(state = [], action) {
	switch (action.type) {
	case CATEGORIES_FETCH_DATA_SUCCESS:
		return action.payload;
	default:
		return state;
	}
}
