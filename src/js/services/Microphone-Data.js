var _ = require( 'lodash' );
var TASK = require( '../../TASK/js/Base' );
var Analyser = require( 'audio-analyser' );
var mic = require( 'mic' );

class MicrophoneDataService extends TASK {
	constructor() {
		super( {
			bindFunctions: [
				'start',
				'stop'
			]
		} );

		this.sampleDuration = 1000 / 20;
		this.fftData = [];

		this.analyser = new Analyser( {
			// Magnitude diapasone, in dB
			minDecibels: -100,
			maxDecibels: -30,

			// Number of time samples to transform to frequency
			fftSize: 2048,

			// Number of frequencies, twice less than fftSize
			frequencyBinCount: 2048 / 2,

			// Smoothing, or the priority of the old data over the new data
			smoothingTimeConstant: 0.2,

			// Number of channel to analyse
			channel: 0,

			// Size of time data to buffer
			bufferSize: 4096 * 2,

			// Windowing function for fft, https://github.com/scijs/window-functions
			// applyWindow: function (sampleNumber, totalSamples) {
			// }

			//...pcm-stream params, if required
		} );

		this.micInstance = mic( {
			'rate': '44100',
			'channels': '1',
			'debug': true
		} );
		this.micInputStream = this.micInstance.getAudioStream();

		this.micInputStream.pipe( this.analyser );

		this.micInputStream.on( 'data', function( data ) {
			// console.log( 'Recieved Input Stream: ' + data.length );
		} );

		this.micInputStream.on( 'error', function( err ) {
			// console.log( 'Error in Input Stream: ' + err );
		} );

		this.micInputStream.on( 'startComplete', function() {
			// console.log( 'Got SIGNAL startComplete' );
			// setTimeout( function () {
			// 	micInstance.pause();
			// }, 5000 );
		} );

		this.micInputStream.on( 'stopComplete', function() {
			// console.log( 'Got SIGNAL stopComplete' );
		} );

		this.micInputStream.on( 'pauseComplete', function() {
			// console.log( 'Got SIGNAL pauseComplete' );
			// setTimeout( function () {
			// 	micInstance.resume();
			// }, 5000 );
		} );

		this.micInputStream.on( 'resumeComplete', function() {
			// console.log( 'Got SIGNAL resumeComplete' );
			// setTimeout( function () {
			// 	micInstance.stop();
			// }, 5000 );
		} );

		this.micInputStream.on( 'silence', function() {
			// console.log( 'Got SIGNAL silence' );
		} );

		this.micInputStream.on( 'processExitComplete', function() {
			// console.log( 'Got SIGNAL processExitComplete' );
		} );
	}

	start() {
		this.micInstance.start();
		this.sampleInterval = setInterval( () => {
			var buf = new Uint8Array( 1024 );
			buf = this.analyser.getByteFrequencyData( buf );

			for ( var j = 0, endj = buf.length; j < endj; j++ ) {
				this.fftData[ j ] = buf[ j ];
			}

			this.trigger( 'fft', {
				fftData: this.fftData
			} );
		}, this.sampleDuration );
	}

	stop() {
		this.micInstance.stop();
		this.clearInterval( this.sampleInterval );
	}
}

module.exports = MicrophoneDataService;
