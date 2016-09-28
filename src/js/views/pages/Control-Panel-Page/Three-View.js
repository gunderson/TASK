var _ = require( 'lodash' );
var ThreeView = require( '_PEAK/views/Three-View/Three-View' );

var BasicScene = require( '_PEAK/views/Three-View//scenes/BasicScene' );
var TriangleViz = require( './scenes/TriangleViz' );
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
				'TriangleViz': TriangleViz,
				'facebook': FacebookInstallation,
				'Single Box': BasicScene,
			},
			fftData: _.map( _.range( 1024 ), () => 127 ),

			// ---------------------------------------------------
			// Event Listeners
			// ---------------------------------------------------
			// Bind Functions
		}, options, ThreeView.mergeRules ) );

	}

	sync( data ) {
		this.activeScene.colorMapOffset = data.colorMapOffset;
	}

	update( data ) {
		if ( data.fftData ) this.fftData = data.fftData;
		data.fftData = this.fftData;
		if ( this.activeScene && this.activeScene.isLoaded ) {
			this.activeScene.update( data );
		}
	};
}

module.exports = ControlPanelThreeView;
