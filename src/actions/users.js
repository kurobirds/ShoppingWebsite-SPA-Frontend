export const ADD_USER = "ADD_CATEGORY";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const USERS_FETCH_DATA_SUCCESS = "USERS_FETCH_DATA_SUCCESS";

export function addUser(user) {
	return {
		type: ADD_USER,
		payload: user,
	};
}

export function updateUser(user, index) {
	return {
		type: UPDATE_USER,
		user,
		index,
	};
}

export function deleteUser(id) {
	return {
		type: DELETE_USER,
		payload: id,
	};
}

export function usersFetchDataSuccess(users) {
	return {
		type: USERS_FETCH_DATA_SUCCESS,
		payload: users,
	};
}

export function usersFetchData(url) {
	return dispatch => {
		fetch(url)
			.then(response => response.json())
			.then(users => dispatch(usersFetchDataSuccess(users)))
			.catch(err => console.log(err));
	};
}
