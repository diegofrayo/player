// import firebase from 'firebase';

import APP from 'utils/app.js';
import SongUtilities from 'utils/utilities/SongUtilities';

firebase.initializeApp({
	databaseURL: '@@firebase_database_url',
	authDomain: '@@firebase_auth_domain',
	apiKey: '@@firebase_api_key'
});

export class FirebaseImplementationClass {

	constructor(firebaseConfig) {
		this.db_reference = firebaseConfig.db_reference;
		this.playlist = [];
		this.routes = firebaseConfig.routes;
		this.registeredCallbacks = {
			playlist: {
				child_added: {},
				child_changed: {},
				child_removed: {}
			},
			favorites: {
				child_added: {},
				child_changed: {},
				child_removed: {}
			}
		};
	}

	registerCallback(watcherName, componentName, eventName, callback) {
		this.registeredCallbacks[watcherName][eventName][componentName] = callback;
	}

	unregisterCallbacks(componentName) {

		const callbacks = this.registeredCallbacks;

		for (const watcherName in callbacks) {

			// no-prototype-builtins
			if (Object.hasOwnProperty.call(callbacks, watcherName)) {

				const watcherCallbacks = callbacks[watcherName];

				for (const eventName in watcherCallbacks) {

					// no-prototype-builtins
					if (Object.hasOwnProperty.call(watcherCallbacks, eventName)) {

						const eventCallbacks = watcherCallbacks[eventName];

						for (const componentKey in eventCallbacks) {

							// no-prototype-builtins
							if (Object.hasOwnProperty.call(eventCallbacks, componentKey) && componentName === componentKey) {

								if (eventCallbacks[componentKey]) {
									delete eventCallbacks[componentKey];
								}

							}

						}

					}

				}

			}

		}

	}

	executeCallbacks(watcherName, eventName) {

		const callbacks = this.registeredCallbacks[watcherName][eventName];

		for (const componentKey in callbacks) {

			// no-prototype-builtins
			if (Object.hasOwnProperty.call(callbacks, componentKey)) {

				if (callbacks[componentKey]) {
					callbacks[componentKey]();
				}

			}

		}

	}

	getPlaylist() {
		return this.playlist;
	}

	downloadPlaylist() {

		const promise = APP.promise.createPromise((resolve) => {

			this.db_reference.child(this.routes.playlist('diegofrayo')).once('value', (snapshot) => {

				if (snapshot.exists()) {
					this.playlist = SongUtilities.jsonToArray(snapshot.val());
				}

				this.playlist.sort(SongUtilities.sortPlaylist);
				resolve(this.playlist);
			});

		});

		return promise;
	}

	getFavorites() {

		if (this.favorites === undefined) {
			this.favorites = [];
		}

		return this.favorites;
	}

	initPlaylistWatchers() {

		if (this.playlistReference === undefined) {

			// TODO: Improve this route
			this.playlistReference = this.db_reference.child(this.routes.playlist('diegofrayo'));

			this.playlistReference.on('child_added', (snapshot) => {

				let song = snapshot.val();

				if (song && SongUtilities.arrayIndexOf(this.playlist, 'source_id', song.source_id) === -1) {

					// TODO: Clone object
					this.playlist.push(SongUtilities.cloneObject(song));
					this.playlist.sort(SongUtilities.sortPlaylist);
					this.executeCallbacks('playlist', 'child_added');
				}

				song = null;
			});

			this.playlistReference.on('child_changed', (snapshot) => {

				let changedSong = snapshot.val();

				if (changedSong) {

					const index = SongUtilities.arrayIndexOf(this.playlist, 'source_id', changedSong.source_id);

					if (index !== -1) {
						// TODO: Clone object
						this.playlist[index] = SongUtilities.cloneObject(changedSong);
					}

					this.playlist.sort(SongUtilities.sortPlaylist);

					this.executeCallbacks('playlist', 'child_changed');

				}

				changedSong = null;
			});

			this.playlistReference.on('child_removed', (snapshot) => {

				let removedSong = snapshot.val();

				if (removedSong) {

					const index = SongUtilities.arrayIndexOf(this.playlist, 'source_id', removedSong.source_id);

					if (index !== -1) {
						this.playlist.splice(index, 1);
					}

					this.playlist.sort(SongUtilities.sortPlaylist);
					this.executeCallbacks('playlist', 'child_removed');
				}

				removedSong = null;
			});

		}

	}

	initFavoritesWatchers() {

		if (this.favoritesReference === undefined) {

			// TODO: Improve this route
			this.favoritesReference = this.db_reference.child(this.routes.favorites('diegofrayo'));

			this.favoritesReference.on('child_added', (snapshot) => {

				let song = snapshot.val();

				if (song) {
					// TODO: Clone object
					this.favorites.push(SongUtilities.cloneObject(song));
					this.favorites.sort(SongUtilities.sortByTimestamp);
					this.executeCallbacks('favorites', 'child_added');
				}

				song = null;
			});

			this.favoritesReference.on('child_changed', (snapshot) => {

				let changedSong = snapshot.val();

				if (changedSong) {

					const index = SongUtilities.arrayIndexOf(this.favorites, 'source_id', changedSong.source_id);

					if (index !== -1) {
						// TODO: Clone object
						this.favorites[index] = SongUtilities.cloneObject(changedSong);
					}

					this.favorites.sort(SongUtilities.sortByTimestamp);
					this.executeCallbacks('favorites', 'child_changed');
				}

				changedSong = null;
			});

			this.favoritesReference.on('child_removed', (snapshot) => {

				let removedSong = snapshot.val();

				if (removedSong) {

					const index = SongUtilities.arrayIndexOf(this.favorites, 'source_id', removedSong.source_id);

					if (index !== -1) {
						this.favorites.splice(index, 1);
					}

					this.favorites.sort(SongUtilities.sortByTimestamp);
					this.executeCallbacks('favorites', 'child_removed');
				}

				removedSong = null;
			});

		}

	}

	addSongToPlaylist(username, song) {

		const newSong = SongUtilities.cloneObject(song);

		newSong.type = 'normal';
		newSong.votes = 0;
		newSong.is_playing = false;

		return this.db_reference.child(this.routes.playlist(username)).child(song.source_id).update(newSong);
	}

	removeSongFromPlaylist(username, song) {
		return this.db_reference.child(this.routes.playlist(username)).child(song.source_id).remove();
	}

	addSongToFavorites(username, song) {

		const newSong = SongUtilities.cloneObject(song);

		delete newSong.is_playing;
		delete newSong.type;
		delete newSong.votes;

		return this.db_reference.child(this.routes.favorites(username)).child(song.source_id).update(newSong);
	}

	removeSongFromFavorites(username, song) {
		return this.db_reference.child(this.routes.favorites(username)).child(song.source_id).remove();
	}

	addSongToTop(username, song) {

		// TODO: Clone object
		const newSong = SongUtilities.cloneObject(song);

		newSong.type = 'top';

		return this.db_reference.child(this.routes.playlist(username)).child(song.source_id).update(newSong);
	}

	addVoteToSong(username, song) {

		// TODO: Clone object
		const newSong = SongUtilities.cloneObject(song);

		newSong.votes += 1;

		return this.db_reference.child(this.routes.playlist(username)).child(song.source_id).update(newSong);
	}

}

export const FIREBASE_CONNECTION = {
	db_reference: firebase.database().ref(),
	routes: {
		playlist: username => `player/${username}/playlist`,
		playlists: username => `player/${username}/playlists`,
		favorites: username => `player/${username}/favorites`
	}
};