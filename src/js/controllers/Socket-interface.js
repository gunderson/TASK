var SocketIO = require( 'socket-io' );

class SocketInterface {
	constructor( app ) {
		this.io = new SocketIO( app );
	}
}

module.exports = SocketInterface;
