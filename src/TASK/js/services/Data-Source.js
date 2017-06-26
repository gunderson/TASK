/**
 * The *AudioSource object creates an analyzer node, sets up a repeating function with setInterval
 * which samples the input and turns it into an FFT array. The object has two properties:
 * streamData - this is the Uint8Array containing the FFT data
 * volume - cumulative value of all the bins of the streaData.
 *
 * The MicrophoneAudioSource uses the getUserMedia interface to get real-time data from the user's microphone. Not used currently but included for possible future use.
 */
var TASK = require( '_TASK/Base' );
var _ = require( 'lodash' );

class DataSource extends TASK {
	constructor( options ) {
		super( _.mergeWith( {
			dataSize: 2048,
			startTime: Date.now()
		}, options, TASK.mergeRules ) )
	}
	update() {}
	onUpdate() {
		this.update();
	}
	startSampling() {}
	stopSampling() {}
	destroy() {}
	get currentTime() {
		return Date.now() - this.startTime;
	}
}

module.exports = DataSource;
