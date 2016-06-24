var _ = require( 'lodash' );
// var TaskPage = require( '../../framework/js/pages/Page' );
var TaskPage = require( './Page' );

class DefaultPage extends TaskPage {
	constructor( options ) {

		// ---------------------------------------------------
		// Local Properties

		super( _.defaults( options, {
			name: 'default-page'
		} ) );
	}
}

module.exports = DefaultPage;
