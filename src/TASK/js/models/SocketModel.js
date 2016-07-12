var _ = require( 'lodash' );
var TaskModel = require( '_TASK/models/Model' );
var io = require( 'socket-io/client' );

class SocketModel extends TaskModel {
	constructor( attributes, options ) {
		super( _.merge( {
			// default attributes
		}, attributes ), _.merge( {
			// default options
		}, options ) );

		// ---------------------------------------------------
		// Local Properties

		this.socket = io.socket();

		// ---------------------------------------------------
		// Bind Functions

		TaskModel.bindFunctions( this, [
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
