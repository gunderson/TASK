// imports
var MasterPage = require( './Master-Page' );
var ControlPanelPage = require( './Control-Panel-Page' );
var ThreejsPage = require( '_TASK/views/pages/Threejs-Page' );

module.exports = [
	// exports
	new MasterPage( {
		col: 0,
		row: 0
	} ),
	new ControlPanelPage( {
		col: 1,
		row: 0
	} ),
	new ThreejsPage( {
		col: 2,
		row: 0
	} )
];
