var _ = require( 'lodash' );
var Page = require( '_TASK/views/pages/Page' );
// var AnimationPlayer = require( '_art-kit/media/AnimationPlayer' );

import AnimationPlayer from '_art-kit/media/AnimationPlayer';

class AnimationPlayerPage extends Page {
	constructor( options ) {
		super( _.mergeWith( {

			// ---------------------------------------------------
			// Classs Properties

			name: 'Animation-Player',

			// ---------------------------------------------------
			// Local Properties

			autoPlay: false,
			autoStop: true,

			// ---------------------------------------------------
			// Bind Functions

			bindFunctions: [
				'play',
				'stop',
				'update',
				'draw',
				'transitionInComplete',
				'transitionOut'
			]
		}, options, Page.mergeRules ) );

		this.player = new AnimationPlayer( this.update, this.draw );
	}

	transitionInComplete() {
		super.transitionInComplete();
		if ( this.autoPlay ) this.play();
	}

	// transitionIn() {
	// 	super.transitionIn();
	// }

	transitionOut() {
		super.transitionOut();
		if ( this.autoStop ) this.stop();
	}

	play() {
		this.player.play();
		this.trigger( 'play' );
	};

	stop() {
		this.player.stop();
		this.trigger( 'stop' );
	};

	update( data ) {

	};

	draw() {

	};

	get currentTime() {
		return this.player.currentTime;
	}
	set currentTime( val ) {
		this.player.currentTime = val;
		return val;
	}
}

module.exports = AnimationPlayerPage;
