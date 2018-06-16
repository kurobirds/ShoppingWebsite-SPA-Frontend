import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT_SUCCESS,
} from "../actions/auth";

export default function auth(
	state = {
		token: localStorage.token || null,
		isFetching: false,
		isAuthenticated: localStorage.token ? true : false,
	},
	action
) {
	switch (action.type) {
	case LOGIN_REQUEST:
		return {
			...state,
			isFetching: true,
			isAuthenticated: false,
		};

	case LOGIN_SUCCESS:
		return {
			...state,
			token: action.token,
			isFetching: false,
			isAuthenticated: true,
			errorMessage: "",
		};
	case LOGIN_FAILURE:
		return {
			...state,
			isFetching: false,
			isAuthenticated: false,
			errorMessage: action.message,
		};
	case LOGOUT_SUCCESS:
		return {
			...state,
			isFetching: true,
			isAuthenticated: false,
			token: action.token,
		};
	default:
		return state;
	}
}
