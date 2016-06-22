var _ = require( 'lodash' );
var TaskPage = require( '../../framework/Page' );

class MasterPage extends TaskPage {
	constructor( options ) {

		// ---------------------------------------------------
		// Local Properties

		super( _.defaults( options, {
			name: 'master-page'
		} ) );
	}
}

module.exports = MasterPage;
