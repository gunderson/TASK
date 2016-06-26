// imports
var Master = require( './Master-Page' );
var ControlPanel = require( './Control-Panel-Page' );
var Threejs = require( '_TASK/views/pages/Threejs-Page' );

module.exports = [
	// exports
	new Master( {
		col: 0,
		row: 0
	} ),
	new ControlPanel( {
		col: 1,
		row: 0
	} ),
	new Threejs( {
		col: 2,
		row: 0
	} )
];
