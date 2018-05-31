/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/

Number.prototype.formatUSD = function() {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(this);
};

Number.prototype.formatVND = function() {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(this);
};
