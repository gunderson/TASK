var _ = require( 'lodash' );
var TaskPage = require( '_TASK/views/pages/Page' );
// var AnimationPlayer = require( '_art-kit/media/AnimationPlayer' );

import AnimationPlayer from '_art-kit/media/AnimationPlayer';

class AnimationPlayerPage extends TaskPage {
	constructor( options ) {
		super( _.merge( {
			name: 'Animation-Player',
			autoPlay: false,
			autoStop: true
		}, options ) );

		// ---------------------------------------------------
		// Local Properties

		// ---------------------------------------------------
		// Bind Functions

		this.bindFunctions( this, [
			'play',
			'stop',
			'update',
			'draw'
		] );

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
