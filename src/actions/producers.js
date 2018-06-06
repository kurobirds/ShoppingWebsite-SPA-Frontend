export const ADD_PRODUCER = "ADD_PRODUCER";
export const DELETE_PRODUCER = "DELETE_PRODUCER";
export const UPDATE_PRODUCER = "UPDATE_PRODUCER";
export const PRODUCERS_FETCH_DATA_SUCCESS = "PRODUCERS_FETCH_DATA_SUCCESS";
export const PRODUCERS_IS_LOADING = "PRODUCERS_IS_LOADING";

export function producersIsLoading(bool) {
	return {
		type: PRODUCERS_IS_LOADING,
		isLoading: bool,
	};
}

export function addProducer(producer) {
	return {
		type: ADD_PRODUCER,
		payload: producer,
	};
}

export function updateProducer(producer, id) {
	return {
		type: UPDATE_PRODUCER,
		producer,
		id,
	};
}

export function deleteProducer(id) {
	return {
		type: DELETE_PRODUCER,
		payload: id,
	};
}

export function producersFetchDataSuccess(producers) {
	return {
		type: PRODUCERS_FETCH_DATA_SUCCESS,
		payload: producers,
	};
}

export function producersFetchData(url) {
	return dispatch => {
		dispatch(producersIsLoading(true));
		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				dispatch(producersIsLoading(false));
				return response;
			})
			.then(response => response.json())
			.then(producers => dispatch(producersFetchDataSuccess(producers)))
			.catch(err => console.log(err));
	};
}
