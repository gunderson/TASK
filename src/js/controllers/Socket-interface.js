var SocketIO = require( 'socket.io' );
var _ = require( 'lodash' );
var TASK = require( '../../TASK/js/Base' );

class SocketInterface extends TASK {
	constructor( server ) {
		super( {
			bindFunctions: [
				'broadcastRestart',
				'broadcastSync',
				'broadcastFFT',
			]
		} );

		this.io = new SocketIO( server );
		// this.io.set( 'origins', 'http://pgtool.local:3011 ' );
		this.io.on( 'connection', ( client ) => {
			client.on( 'sync', ( data ) => {
				this.broadcastSync( data );
			} );
			client.on( 'restart', () => {
				this.broadcastRestart();
			} );
		} );
	}

	broadcastRestart() {
		this.io.emit( 'restart' );
	}

	broadcastSync( data ) {
		this.io.emit( 'sync', data );
	}

	broadcastFFT( data ) {
		this.io.emit( 'fft', data );
	}
}

module.exports = SocketInterface;
