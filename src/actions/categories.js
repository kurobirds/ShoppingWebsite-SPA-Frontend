export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const CATEGORIES_FETCH_DATA_SUCCESS = "CATEGORIES_FETCH_DATA_SUCCESS";

export function addCategory(category) {
	return {
		type: ADD_CATEGORY,
		payload: category,
	};
}

export function updateCategory(category, index) {
	return {
		type: UPDATE_CATEGORY,
		category,
		index,
	};
}

export function deleteCategory(id) {
	return {
		type: DELETE_CATEGORY,
		payload: id,
	};
}

export function categoriesFetchDataSuccess(categories) {
	return {
		type: CATEGORIES_FETCH_DATA_SUCCESS,
		payload: categories,
	};
}

export function categoriesFetchData(url) {
	return dispatch => {
		fetch(url)
			.then(response => response.json())
			.then(categories =>
				dispatch(categoriesFetchDataSuccess(categories))
			)
			.catch(err => console.log(err));
	};
}
