var $ = require( 'jquery' );
var _ = require( 'lodash' );
var PEAK = require( '_PEAK/Base' );
var Page = require( '_PEAK/views/pages/Page' );

class ArtDetailPage extends Page {
	constructor( options ) {

		// ---------------------------------------------------
		// Local Properties

		super( _.mergeWith( {
			name: 'Art-Detail',

			// ---------------------------------------------------
			// Child Views

			views: [],

			// ---------------------------------------------------
			// Event Listeners

			events: [],

			// ---------------------------------------------------
			// Function Bindings

			bindFunctions: []

			// ---------------------------------------------------
			// Local Properties

		}, options, PEAK.mergeRules ) );

	}

	// ---------------------------------------------------
	// Public Methods

	// ---------------------------------------------------
	// Event Handlers

	// ---------------------------------------------------
	// Getters & Setters
}

module.exports = ArtDetailPage;
