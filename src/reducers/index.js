import { combineReducers } from "redux";

import base_url from "./base_url";
import { categories, categoriesIsLoading } from "./categories";
import { producers, producersIsLoading } from "./producers";
import { products, productsIsLoading } from "./products";
import { users, usersIsLoading } from "./users";

export default combineReducers({
	base_url,

	categories,
	categoriesIsLoading,

	producers,
	producersIsLoading,

	products,
	productsIsLoading,

	users,
	usersIsLoading,
});
