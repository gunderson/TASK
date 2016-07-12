// imports
var Home = require( './Home-Page' );
var ControlPanel = require( './Control-Panel-Page' );

module.exports = [
	// exports
	new Home( {
		col: 0,
		row: 0
	} ),
	new ControlPanel( {
		col: 1,
		row: 0
	} )
];
