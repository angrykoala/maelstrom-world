"use strict";

module.exports = {
	slugify: function(text) {
		return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/&/g, '-and-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
	}
};
