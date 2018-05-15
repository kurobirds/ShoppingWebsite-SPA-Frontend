import { combineReducers } from "redux";

import endpoint from "./endpoint";
import categories from "./categories";
import producers from "./producers";
import products from "./products";
import users from "./users";

export default combineReducers({
	endpoint,
	categories,
	producers,
	products,
	users,
});
