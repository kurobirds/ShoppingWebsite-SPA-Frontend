import moment from "moment";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const USERS_FETCH_DATA_SUCCESS = "USERS_FETCH_DATA_SUCCESS";
export const USERS_IS_LOADING = "USERS_IS_LOADING";

export function usersIsLoading(bool) {
	return {
		type: USERS_IS_LOADING,
		isLoading: bool,
	};
}
export function addUser(user) {
	return {
		type: ADD_USER,
		payload: user,
	};
}

export function updateUser(user, id) {
	return {
		type: UPDATE_USER,
		user,
		id,
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
	const token = localStorage.getItem("token") || null;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	return dispatch => {
		dispatch(usersIsLoading(true));
		fetch(url, config)
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				dispatch(usersIsLoading(false));
				return response;
			})
			.then(response => response.json())
			.then(users => {
				users.forEach(element => {
					element.DOB = moment.unix(element.DOB).format("YYYY-MM-DD");
				});
				dispatch(usersFetchDataSuccess(users));
			})
			.catch(err => console.log(err));
	};
}
