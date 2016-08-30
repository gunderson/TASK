// imports
var Projector = require( './Projector-Page' );
var Home = require( './Home-Page' );
var ControlPanel = require( './Control-Panel-Page' );

module.exports = {
	// exports
	'Projector': new Projector( {
		col: 2,
		row: 0
	} ),
	'Home': new Home( {
		col: 0,
		row: 0
	} ),
	'Control Panel': new ControlPanel( {
		col: 1,
		row: 0
	} )
};
