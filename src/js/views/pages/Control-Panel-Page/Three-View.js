var _ = require( 'lodash' );
var ThreeView = require( '_TASK/views/Three-View/Three-View' );

var BasicScene = require( '_TASK/views/Three-View//scenes/BasicScene' );
var BoxLine = require( './scenes/BoxLine' );
var FacebookInstallation = require( './scenes/FacebookInstallation' );
// TODO abstract three-view

class ControlPanelThreeView extends ThreeView {
	constructor( options ) {

		super( _.mergeWith( {

			// ---------------------------------------------------
			// Class Properties

			// ---------------------------------------------------
			// Local Properties

			rendererOptions: {},
			scenes: {
				'facebook': FacebookInstallation,
				'Box Line': BoxLine,
				'Single Box': BasicScene,
			}

			// ---------------------------------------------------
			// Event Listeners
			// ---------------------------------------------------
			// Bind Functions
		}, options, ThreeView.mergeRules ) );

	}
}

module.exports = ControlPanelThreeView;
