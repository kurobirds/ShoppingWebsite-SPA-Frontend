import moment from "moment";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const ORDERS_FETCH_DATA_SUCCESS = "ORDERS_FETCH_DATA_SUCCESS";
export const ORDERS_IS_LOADING = "ORDERS_IS_LOADING";

export function orderIsLoading(bool) {
	return {
		type: ORDERS_IS_LOADING,
		isLoading: bool,
	};
}

export function updateOrder(order, id) {
	return {
		type: UPDATE_ORDER,
		order,
		id,
	};
}

export function ordersFetchDataSuccess(orders) {
	return {
		type: ORDERS_FETCH_DATA_SUCCESS,
		payload: orders,
	};
}

export function ordersFetchData(url) {
	return dispatch => {
		dispatch(orderIsLoading(true));
		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				dispatch(orderIsLoading(false));
				return response;
			})
			.then(response => response.json())
			.then(orders => {
				orders.forEach(element => {
					element.Order_Date = moment
						.unix(element.Order_Date)
						.format("YYYY-MM-DD HH:mm:ss");
				});
				dispatch(ordersFetchDataSuccess(orders));
			})
			.catch(err => console.log(err));
	};
}
