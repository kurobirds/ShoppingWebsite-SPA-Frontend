export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

function requestLogin(creds) {
	return {
		type: LOGIN_REQUEST,
		isFetching: true,
		isAuthenticated: false,
		creds,
	};
}

function receiveLogin(user) {
	return {
		type: LOGIN_SUCCESS,
		isFetching: false,
		isAuthenticated: true,
		token: user.token,
	};
}

function loginError(message) {
	return {
		type: LOGIN_FAILURE,
		isFetching: false,
		isAuthenticated: false,
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
		dispatch(requestLogin(creds));

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
					dispatch(receiveLogin(user));
				}
			})
			.catch(err => console.log("Error: ", err));
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
	};
}

export function logoutUser() {
	return dispatch => {
		dispatch(requestLogout());
		localStorage.removeItem("token");
		dispatch(receiveLogout());
	};
}
