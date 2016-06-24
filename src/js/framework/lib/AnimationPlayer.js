var _ = require("underscore");
var $ = require("jquery");
require("underscore.filledArray");

var prefixMethod = require("./prefixmethod");
prefixMethod("requestAnimationFrame");
prefixMethod("cancelAnimationFrame");

var AnimationPlayer = function(options) {
	var audioSource = options.audioSource;
	var container = options.container;
	var visualizer = options.visualizer;
	var audioPlayer = options.audioPlayer;
	this.collection = options.collection;

	var loopFrame;
	var streamData = new Uint8Array(1024);
	var isPlaying = false;
	var updates = 0;
	var tick = 0;


	this.play = play.bind(this);
	this.stop = stop.bind(this);
	this.onFullScreen = onFullScreen.bind(this);
	this.setVisualizer = setVisualizer.bind(this);
	this.onResize = onResize.bind(this);
	this.audioPlayer = audioPlayer;
	this.el = container;
	this.$el = $(container);


	// ------------------------------------

	var WIDTH, HEIGHT;


	function setVisualizer(_visualizer) {
		visualizer = _visualizer;
		WIDTH = this.$el.width();
		HEIGHT = this.$el.height();
		visualizer.setSize(WIDTH, HEIGHT);
	}

	function onResize() {
		WIDTH = this.$el.width();
		HEIGHT = this.$el.height();
		visualizer.setSize(WIDTH, HEIGHT);
	}

	function onFullScreen(e) {
		this.$el.toggleClass("fullscreen");
		// account for the delay when going to fullscreen
		setTimeout(() => {
			WIDTH = this.$el.width();
			HEIGHT = this.$el.height();
			visualizer.setSize(WIDTH, HEIGHT);
		}, 200);
	}

	// ------------------------------------

	var ticksPerSecond = 30;
	var millisPerTick = 1000 / ticksPerSecond;
	var animationFrameID = null,
		updateIntervalID = null;
	var startTime = 0;

	function play() {
		if (animationFrameID === null) {
			onAnimationFrame();
		}
		if (updateIntervalID === null) {
			if (visualizer) {
				// visualizer.reset();
			}
			if (this.audioSource) {
				onUpdateInterval.call(this);
				updateIntervalID = setInterval(onUpdateInterval.bind(this), millisPerTick);
			} else if (this.collection) {
				onUpdateIntervalNodes.call(this);
				updateIntervalID = setInterval(onUpdateIntervalNodes.bind(this), millisPerTick);
			} else {
				startTime = Date.now();
				onUpdateIntervalWithoutSource.call(this);
				updateIntervalID = setInterval(onUpdateIntervalWithoutSource.bind(this), millisPerTick);
			}
		}
	}

	function stop() {
		cancelAnimationFrame(animationFrameID);
		animationFrameID = null;
		clearInterval(updateIntervalID);
		updateIntervalID = null;
	}

	var fftData;

	function onUpdateInterval() {
		if (!visualizer) return;
		let time = audioSource.currentTime();
		tick = time * 1000 / millisPerTick;

		// console.log(time, tick);

		updates++;

		streamData = new Uint8Array(audioSource.streamData.buffer.slice());
		visualizer.update(streamData, time, tick, updates);
	}

	function onUpdateIntervalNodes() {
		if (!visualizer) return;
		let time = Date.now() - startTime;
		tick = time / millisPerTick;
		updates++;
		visualizer.update(this.collection, time, tick, updates);
	}

	function onUpdateIntervalWithoutSource() {
		if (!visualizer) return;
		let time = Date.now() - startTime;
		tick = time / millisPerTick;
		updates++;
		streamData = new Uint8Array(2048);
		visualizer.update(streamData, time, tick, updates);
	}

	function onAnimationFrame() {
		animationFrameID = requestAnimationFrame(onAnimationFrame);
		if (!visualizer) return;
		visualizer.render();
	}

};



module.exports = AnimationPlayer;
