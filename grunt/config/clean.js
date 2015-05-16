'use strict';

module.exports = {
	server: {
		files: [{
			dot: true,
			src: [
				'.tmp',
				'<%= config.dist %>/*'
			]
		}]
	},
	dist: '.tmp'
};
