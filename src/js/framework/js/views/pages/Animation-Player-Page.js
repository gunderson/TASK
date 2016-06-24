var _ = require( 'lodash' );
// var TaskPage = require( '../../framework/js/pages/Page' );
var TaskPage = require( './Page' );
var AnimationPlayer = require( 'art-kit/src/AnimationPlayer' );

class AnimationPlayerPage extends TaskPage {
	constructor( options ) {
		super( _.defaults( options, {
			name: 'animation-player-page',
			autoPlay: false,
			autoStop: true
		} ) );

		// ---------------------------------------------------
		// Local Properties

		this.player = new AnimationPlayer();
	}

	transitionInComplete() {
		if ( this.autoPlay ) this.play();
	}

	transitionOut() {
		if ( this.autoStop ) this.stop();
	}

	play() {
		this.player.play();
	};

	stop() {
		this.player.stop();
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
