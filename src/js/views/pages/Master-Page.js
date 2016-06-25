var _ = require( 'lodash' );
var TaskPage = require( '_TASK/views/pages/Page' );

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
