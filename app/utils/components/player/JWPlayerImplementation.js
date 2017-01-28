// import APP from 'utils/app';

export default class JWPlayerImplementation {

	setup(configuration) {

		this.configuration = configuration;

		const setupConfig = {
			file: `https://www.youtube.com/watch?v=${this.configuration.source_id}`,
			width: '0px',
			height: '0px',
			key: this.configuration.key
		};

		jwplayer(this.configuration.container_id).setup(setupConfig);
	}

	loadSong(song) {

		jwplayer(this.configuration.container_id).load([{
			file: `https://www.youtube.com/watch?v=${song.source_id}`
		}]);

	}

	play() {
		jwplayer(this.configuration.container_id).play();
	}

	pause() {
		jwplayer(this.configuration.container_id).pause();
	}

	stop() {
		jwplayer(this.configuration.container_id).stop();
	}

	getState() {
		return jwplayer(this.configuration.container_id).getState().toUpperCase();
	}

	getDuration() {
		return jwplayer(this.configuration.container_id).getDuration();
	}

	getVolume() {
		return jwplayer(this.configuration.container_id).getVolume();
	}

	setVolume(value) {
		jwplayer(this.configuration.container_id).setVolume(value);
	}

	getMute() {
		return jwplayer(this.configuration.container_id).getMute();
	}

	setMute() {
		jwplayer(this.configuration.container_id).setMute();
	}

	getPosition() {
		return jwplayer(this.configuration.container_id).getPosition();
	}

	setPosition(position) {
		jwplayer(this.configuration.container_id).seek(position);
	}

	configureCallbacks(callbacks) {
		jwplayer(this.configuration.container_id).on('complete', callbacks.complete);
		jwplayer(this.configuration.container_id).on('error', callbacks.error);
		jwplayer(this.configuration.container_id).on('pause', callbacks.pause);
		jwplayer(this.configuration.container_id).on('play', callbacks.play);
		jwplayer(this.configuration.container_id).on('ready', callbacks.ready);
		jwplayer(this.configuration.container_id).on('seek', callbacks.seek);
		jwplayer(this.configuration.container_id).on('time', callbacks.time);
	}

	// play() {
	// 	return jwplayer(this.configuration.container_id).play();
	// }

	// pause() {
	// 	return jwplayer(this.configuration.container_id).pause();
	// }

	// stop() {
	// 	return jwplayer(this.configuration.container_id).stop();
	// }

	// setup() {}

	// loadSong() {}

	// getVolume() {
	// 	return jwplayer(this.configuration.container_id).getVolume();
	// }

	// setVolume(value) {
	// 	jwplayer(this.configuration.container_id).setVolume(value);
	// }

	// getMute() {
	// 	return jwplayer(this.configuration.container_id).getMute();
	// }

	// setMute() {
	// 	jwplayer(this.configuration.container_id).setMute();
	// }

	// getPosition() {
	// 	return jwplayer(this.configuration.container_id).getPosition();
	// }

	// setPosition(position) {
	// 	jwplayer(this.configuration.container_id).seek(position);
	// }

	// getState() {
	// 	return jwplayer(this.configuration.container_id).getState();
	// }

	// getDuration() {
	// 	return jwplayer(this.configuration.container_id).getDuration();
	// }

	// configureCallbacks(callbacks) {
	// 	jwplayer(this.configuration.container_id).configureCallbacks(callbacks);
	// }

}