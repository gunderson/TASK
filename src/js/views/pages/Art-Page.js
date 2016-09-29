var $ = require( 'jquery' );
var _ = require( 'lodash' );
var PEAK = require( '_PEAK/Base' );
var Page = require( '_PEAK/views/pages/Page' );
var ArtDetail = require( './Art-Detail-Page' );

class ArtPage extends Page {
	constructor( options ) {

		// ---------------------------------------------------
		// Local Properties

		super( _.mergeWith( {
			name: 'Art',

			// ---------------------------------------------------
			// Child Views

			views: {
				'Art-Detail': new ArtDetail()
			},

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

module.exports = ArtPage;
