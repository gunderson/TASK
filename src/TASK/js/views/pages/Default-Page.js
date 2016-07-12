var _ = require( 'lodash' );
var TaskPage = require( '_TASK/views/pages/Page' );

class DefaultPage extends TaskPage {
	constructor( options ) {

		// ---------------------------------------------------
		// Local Properties

		super( _.merge( {
			name: 'Default'
		}, options ) );
	}
}

module.exports = DefaultPage;
