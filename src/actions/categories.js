export const CATEGORIES_FETCH_DATA_SUCCESS = "CATEGORIES_FETCH_DATA_SUCCESS";

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
