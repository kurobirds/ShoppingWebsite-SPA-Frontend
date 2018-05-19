import { combineReducers } from "redux";

import base_url from "./base_url";
import categories from "./categories";
import producers from "./producers";
import products from "./products";
import users from "./users";

export default combineReducers({
	base_url,
	categories,
	producers,
	products,
	users,
});
