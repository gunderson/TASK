var defaults = require( './default.js' ),
	_ = require( 'lodash' );

module.exports = _.defaults( defaults, {
	'name': 'stage',
	'lrPort': 35729,
	'server': '0.0.0.0',
	'port': 3000
} );
