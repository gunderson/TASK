var _ = require( 'lodash' );
var TASK = require( '_TASK/Base' );
var ThreeView = require( '_TASK/views/Three-View/Three-View' );

var BasicScene = require( '_TASK/views/Three-View//scenes/BasicScene' );
var TriangleViz = require( './scenes/TriangleViz' );
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
				'TriangleViz': TriangleViz,
				'facebook': FacebookInstallation,
				'Single Box': BasicScene,
			},

			// ---------------------------------------------------
			// Event Listeners

			// ---------------------------------------------------
			// Bind Functions
			bindFunctions: [
				'setCameraPosition'
			]
		}, options, TASK.mergeRules ) );

	}

	setCameraPosition( index ) {
		if ( this.activeScene && this.activeScene.setCameraPosition ) this.activeScene.setCameraPosition( index );
	}

}

module.exports = ProjectorThreeView;
