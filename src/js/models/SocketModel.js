var _ = require( 'lodash' );
var Model = require( './Model' );
var io = require( 'socket-io/client' );

class SocketModel extends Model {
	constructor( attributes, options ) {
		super( Model.merge( {
				// default attributes
			}, attributes ),
			Model.merge( {
				events: {
					target: 'io',
					eventName: 'connect',
					handler: 'onConnect'
				},
				bindFunctions: [
					'onConnect'
				]
			}, options )
		);

		// ---------------------------------------------------
		// Local Properties

		this.socket = io.socket( this.url );
	}

	onConnect() {
		_.each( this._attributes, ( val, name ) => {
			this.socket.on( `change:${name}`, ( data ) => this[ name ] = data );
		} )
	}
}

module.exports = SocketModel;
