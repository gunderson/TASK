var _ = require( 'lodash' );
var TASK = require( '_TASK/Base' );
var ThreeView = require( '_TASK/views/Three-View/Three-View' );

var BasicScene = require( '_TASK/views/Three-View//scenes/BasicScene' );
var BoxLine = require( './scenes/BoxLine' );
var FacebookInstallation = require( './scenes/FacebookInstallation' );
// TODO abstract three-view

class ProjectorThreeView extends ThreeView {
	constructor( options ) {

		super( _.mergeWith( {

			// ---------------------------------------------------
			// Class Properties

			// ---------------------------------------------------
			// Local Properties

			rendererOptions: {},
			scenes: {
				'Box Line': BoxLine,
				'Single Box': BasicScene,
				'facebook': FacebookInstallation
			}

			// ---------------------------------------------------
			// Event Listeners
			// ---------------------------------------------------
			// Bind Functions
		}, options, TASK.mergeRules ) );

	}
}

module.exports = ProjectorThreeView;
