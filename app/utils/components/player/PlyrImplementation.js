// npm libs
import plyr from 'plyr';

export default class PlyrImplementation {

	setup(configuration) {

		this.configuration = configuration;

		const setupConfig = {
			autoplay: false,
			controls: [],
			displayDuration: false,
			hideControls: true,
			volume: 10
		};

		this.player = plyr.setup(document.getElementById(this.configuration.container_id), setupConfig)[0];
	}

	loadSong(song) {
		// if(!this.player.isReady()){return;}
		this.player.source({
			type: 'video',
			title: song.title,
			sources: [{
				src: song.source_id,
				type: 'youtube'
			}]
		});
	}

	play() {
		this.player.play();
	}

	pause() {
		this.player.pause();
	}

	stop() {
		this.player.stop();
	}

	getState() {
		return this.player.isPaused() ? 'PAUSED' : 'PLAYING';
	}

	getDuration() {
		return this.player.getDuration();
	}

	getVolume() {
		return this.player.getVolume();
	}

	setVolume(value) {
		this.player.setVolume(value / 100);
	}

	getMute() {
		return this.player.isMuted();
	}

	setMute() {
		this.player.setVolume(0);
	}

	getPosition() {
		return this.player.getCurrentTime();
	}

	setPosition(position) {
		this.player.seek(position);
	}

	configureCallbacks(callbacks) {
		this.player.on('ended', callbacks.complete);
		this.player.on('error', callbacks.error);
		this.player.on('pause', callbacks.pause);
		this.player.on('play', callbacks.play);
		this.player.on('ready', callbacks.ready);
		this.player.on('seeked', callbacks.seek);
		this.player.on('timeupdate', callbacks.time);
	}

}