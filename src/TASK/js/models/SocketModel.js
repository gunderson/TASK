var _ = require( 'lodash' );
var Model = require( '_TASK/models/Model' );
var io = require( 'socket-io/client' );

class SocketModel extends Model {
	constructor( attributes, options ) {
		super( _.mergeWith( {
			// default attributes
		}, attributes, Model.mergeRules ), _.mergeWith( {
			// default options
		}, options, Model.mergeRules ) );

		// ---------------------------------------------------
		// Local Properties

		this.socket = io.socket();

		// ---------------------------------------------------
		// Bind Functions

		Model.bindFunctions( this, [
			'onConnect'
		] );

		// ---------------------------------------------------
		// Event Handlers

		io.on( 'connect', this.onConnect );
	}

	onConnect() {
		// do something
	}
}

module.exports = SocketModel;
