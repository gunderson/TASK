var _ = require( 'lodash' );
var TaskPage = require( '_TASK/views/pages/Page' );
var TASK = require( '_TASK/TASK-Base' );
var AnimationPlayer = require( '_art-kit/AnimationPlayer' );

class AnimationPlayerPage extends TaskPage {
	constructor( options ) {
		super( _.defaults( options, {
			name: 'animation-player-page',
			autoPlay: false,
			autoStop: true
		} ) );

		// ---------------------------------------------------
		// Local Properties

		// ---------------------------------------------------
		// Bind Functions

		TASK.bindFunctions( this, [
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

	transitionOut() {
		super.transitionOut();
		if ( this.autoStop ) this.stop();
	}

	play() {
		this.player.play();
	};

	stop() {
		this.player.stop();
	};

	update() {

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
