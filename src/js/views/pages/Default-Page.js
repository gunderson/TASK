var _ = require( 'lodash' );
var Page = require( 'peak/js/views/pages/Page' );

class DefaultPage extends Page {
	constructor( options ) {
		super( _.mergeWith( {

			// ---------------------------------------------------
			// Classs Properties

			name: 'Default'
		}, options, Page.mergeRules ) );
	}
}

module.exports = DefaultPage;
