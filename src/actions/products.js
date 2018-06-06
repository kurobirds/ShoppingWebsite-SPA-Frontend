export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const PRODUCTS_FETCH_DATA_SUCCESS = "PRODUCTS_FETCH_DATA_SUCCESS";
export const PRODUCTS_IS_LOADING = "PRODUCTS_IS_LOADING";

export function productsIsLoading(bool) {
	return {
		type: PRODUCTS_IS_LOADING,
		isLoading: bool,
	};
}

export function addProduct(product) {
	return {
		type: ADD_PRODUCT,
		payload: product,
	};
}

export function updateProduct(product, id) {
	return {
		type: UPDATE_PRODUCT,
		product,
		id,
	};
}

export function deleteProduct(id) {
	return {
		type: DELETE_PRODUCT,
		payload: id,
	};
}

export function productsFetchDataSuccess(products) {
	return {
		type: PRODUCTS_FETCH_DATA_SUCCESS,
		payload: products,
	};
}

export function productsFetchData(url) {
	return dispatch => {
		dispatch(productsIsLoading(true));
		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				dispatch(productsIsLoading(false));
				return response;
			})
			.then(response => response.json())
			.then(products => dispatch(productsFetchDataSuccess(products)))
			.catch(err => console.log(err));
	};
}
