import { message } from "antd";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

function requestLogin() {
	return {
		type: LOGIN_REQUEST,
	};
}

function receiveLogin(user) {
	return {
		type: LOGIN_SUCCESS,
		token: user.token,
	};
}

function loginError(message) {
	return {
		type: LOGIN_FAILURE,
		message,
	};
}

export function loginUser(url, creds) {
	let config = {
		method: "POST",
		headers: { "Content-Type": " application/json" },
		body: JSON.stringify(creds),
	};

	return dispatch => {
		dispatch(requestLogin());

		return fetch(url, config)
			.then(response =>
				response.json().then(user => ({ user, response }))
			)
			.then(({ user, response }) => {
				if (!response.ok) {
					dispatch(loginError(user.message));
					return Promise.reject(user);
				} else {
					localStorage.setItem("token", user.token);
					message.success("Sign-in success");
					dispatch(receiveLogin(user));
				}
			})
			.catch(err => message.error(err.message));
	};
}

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

function requestLogout() {
	return {
		type: LOGOUT_REQUEST,
		isFetching: true,
		isAuthenticated: true,
	};
}

function receiveLogout() {
	return {
		type: LOGOUT_SUCCESS,
		isFetching: false,
		isAuthenticated: false,
		token: "",
	};
}

export function logoutUser() {
	return dispatch => {
		dispatch(requestLogout());
		localStorage.removeItem("token");
		dispatch(receiveLogout());
	};
}
