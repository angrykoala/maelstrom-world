//database configuration
"use strict";

module.exports = {
	url: process.env.DBSERVER || "mongodb://localhost:27017/maelstrom_world", //db url
	regexp: { //regular expressions to use in database
		productName: /^[A-Z][a-z\ -]*[a-z]$/,
		cityName: /^[A-Z][A-Za-z -]*[a-z]$/,
		shipTypeName: /^[A-Z][a-z0-9\ -]*[a-z0-9]$/,
		shipName: /^[a-zA-Z][\w-\ ]{2,23}[\w]$/
	}
};