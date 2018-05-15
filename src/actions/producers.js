export const ADD_PRODUCER = "ADD_PRODUCER";
export const DELETE_PRODUCER = "DELETE_PRODUCER";
export const UPDATE_PRODUCER = "UPDATE_PRODUCER";
export const PRODUCERS_FETCH_DATA_SUCCESS = "PRODUCERS_FETCH_DATA_SUCCESS";

export function addProducer(producer) {
	return {
		type: ADD_PRODUCER,
		payload: producer,
	};
}

export function updateProducer(producer, index) {
	return {
		type: UPDATE_PRODUCER,
		producer,
		index,
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
		fetch(url)
			.then(response => response.json())
			.then(producers => dispatch(producersFetchDataSuccess(producers)))
			.catch(err => console.log(err));
	};
}
