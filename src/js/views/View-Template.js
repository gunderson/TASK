const _ = require( 'lodash' );
const View = require( 'peak/js/views/View' );

class ViewTemplate extends View {
	constructor( options ) {
		super( _.mergeWith( {

		}, options, View.mergeRules ) );
	}
}

module.exports = ViewTemplate;
