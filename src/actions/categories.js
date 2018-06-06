export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const CATEGORIES_FETCH_DATA_SUCCESS = "CATEGORIES_FETCH_DATA_SUCCESS";
export const CATEGORIES_IS_LOADING = "CATEGORIES_IS_LOADING";

export function categoriesIsLoading(bool) {
	return {
		type: CATEGORIES_IS_LOADING,
		isLoading: bool,
	};
}

export function addCategory(category) {
	return {
		type: ADD_CATEGORY,
		payload: category,
	};
}

export function updateCategory(category, id) {
	return {
		type: UPDATE_CATEGORY,
		category,
		id,
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
		dispatch(categoriesIsLoading(true));
		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				dispatch(categoriesIsLoading(false));
				return response;
			})
			.then(response => response.json())
			.then(categories =>
				dispatch(categoriesFetchDataSuccess(categories))
			)
			.catch(err => console.log(err));
	};
}
