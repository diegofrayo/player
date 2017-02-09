// import firebase from 'firebase';

import APP from 'utils/app.js';
import Utilities from 'utils/utilities/Utilities';

firebase.initializeApp({
	databaseURL: '@@firebase_database_url',
	authDomain: '@@firebase_auth_domain',
	apiKey: '@@firebase_api_key'
});

export class FirebaseImplementationClass {

	constructor(firebaseConfig) {
		this.db_reference = firebaseConfig.db_reference;
		this.playlist = [];
		this.isLoadingPlaylist = true;
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

	setPlaylistState() {
		this.isLoadingPlaylist = false;
		this.executeCallbacks('playlist', 'child_added');
	}

	downloadPlaylist(username) {

		const promise = APP.promise.createPromise((resolve) => {

			this.db_reference.child(this.routes.playlist(username)).once('value', (snapshot) => {

				if (snapshot.exists()) {
					this.playlist = Utilities.jsonToArray(snapshot.val());
				}

				this.playlist.sort(Utilities.sortPlaylist);
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

	initPlaylistWatchers(username) {

		if (this.playlistReference === undefined) {

			// TODO: Improve this route
			this.playlistReference = this.db_reference.child(this.routes.playlist(username));

			this.playlistReference.on('child_added', (snapshot) => {

				if (this.isLoadingPlaylist === true) {
					return;
				}

				let song = snapshot.val();

				if (song && Utilities.arrayIndexOf(this.playlist, 'source_id', song.source_id) === -1) {

					// TODO: Clone object
					this.playlist.push(Utilities.cloneObject(song));
					this.playlist.sort(Utilities.sortPlaylist);
					this.executeCallbacks('playlist', 'child_added');
				}

				song = null;
			});

			this.playlistReference.on('child_changed', (snapshot) => {

				if (this.isLoadingPlaylist === true) {
					return;
				}

				let changedSong = snapshot.val();

				if (changedSong) {

					const index = Utilities.arrayIndexOf(this.playlist, 'source_id', changedSong.source_id);

					if (index !== -1) {
						// TODO: Clone object
						this.playlist[index] = Utilities.cloneObject(changedSong);
					}

					this.playlist.sort(Utilities.sortPlaylist);
					this.executeCallbacks('playlist', 'child_changed');
				}

				changedSong = null;
			});

			this.playlistReference.on('child_removed', (snapshot) => {

				if (this.isLoadingPlaylist === true) {
					return;
				}

				let removedSong = snapshot.val();

				if (removedSong) {

					const index = Utilities.arrayIndexOf(this.playlist, 'source_id', removedSong.source_id);

					if (index !== -1) {
						this.playlist.splice(index, 1);
					}

					this.playlist.sort(Utilities.sortPlaylist);
					this.executeCallbacks('playlist', 'child_removed');
				}

				removedSong = null;
			});

		}

	}

	initFavoritesWatchers(username) {

		if (this.favoritesReference === undefined) {

			// TODO: Improve this route
			this.favoritesReference = this.db_reference.child(this.routes.favorites(username));

			this.favoritesReference.on('child_added', (snapshot) => {

				let song = snapshot.val();

				if (song) {
					// TODO: Clone object
					this.favorites.push(Utilities.cloneObject(song));
					this.favorites.sort(Utilities.sortByTitle);
					this.executeCallbacks('favorites', 'child_added');
				}

				song = null;
			});

			this.favoritesReference.on('child_changed', (snapshot) => {

				let changedSong = snapshot.val();

				if (changedSong) {

					const index = Utilities.arrayIndexOf(this.favorites, 'source_id', changedSong.source_id);

					if (index !== -1) {
						// TODO: Clone object
						this.favorites[index] = Utilities.cloneObject(changedSong);
					}

					this.favorites.sort(Utilities.sortByTitle);
					this.executeCallbacks('favorites', 'child_changed');
				}

				changedSong = null;
			});

			this.favoritesReference.on('child_removed', (snapshot) => {

				let removedSong = snapshot.val();

				if (removedSong) {

					const index = Utilities.arrayIndexOf(this.favorites, 'source_id', removedSong.source_id);

					if (index !== -1) {
						this.favorites.splice(index, 1);
					}

					this.favorites.sort(Utilities.sortByTitle);
					this.executeCallbacks('favorites', 'child_removed');
				}

				removedSong = null;
			});

		}

	}

	addSongToPlaylist(username, song, omitIfExists) {

		const promise = APP.promise.createPromise((resolve) => {

			const addSong = () => {

				const newSong = Utilities.cloneObject(song);

				newSong.is_playing = false;
				newSong.timestamp = new Date().getTime();
				newSong.type = newSong.type || 'normal';
				newSong.votes = 0;

				resolve(this.updatePlaylistSong(username, newSong));
			};

			if (omitIfExists === true) {
				addSong();
			} else {

				this.db_reference.child(this.routes.playlist(username)).child(song.source_id)
					.once('value', (snapshot) => {

						if (snapshot.exists()) {
							resolve(this.addVoteToSong(username, snapshot.val()));
						} else {
							addSong();
						}

					});

			}

		});

		return promise;
	}

	removeSongFromPlaylist(username, song) {
		return this.db_reference.child(this.routes.playlist(username)).child(song.source_id).remove();
	}

	addSongToFavorites(username, song) {

		const newSong = Utilities.cloneObject(song);

		newSong.timestamp = new Date().getTime();

		delete newSong.is_playing;
		delete newSong.type;
		delete newSong.votes;

		return this.db_reference.child(this.routes.favorites(username)).child(song.source_id).update(newSong);
	}

	removeSongFromFavorites(username, song) {
		return this.db_reference.child(this.routes.favorites(username)).child(song.source_id).remove();
	}

	addSongToTop(username, song) {

		const updateSong = (type) => {

			const newSong = Utilities.cloneObject(song);
			newSong.type = type || 'top';

			this.db_reference.child(this.routes.playlist(username)).child(song.source_id).once('value', (snapshot) => {

				if (snapshot.exists()) {
					this.updatePlaylistSong(username, newSong);
				} else {
					this.addSongToPlaylist(username, newSong, true);
				}

			});

		};

		if (song.type === 'top') {

			updateSong('normal');

		} else {

			const songTopIndex = Utilities.arrayIndexOf(this.playlist, 'type', 'top');

			if (songTopIndex !== -1) {

				const songTop = Utilities.cloneObject(this.playlist[songTopIndex]);
				songTop.type = 'normal';

				this.updatePlaylistSong(username, songTop)
					.then(() => {
						updateSong();
					});

			} else {
				updateSong();
			}

		}

	}

	addVoteToSong(username, song) {

		// TODO: Clone object
		const newSong = Utilities.cloneObject(song);
		newSong.votes += 1;

		return this.updatePlaylistSong(username, newSong);
	}

	updatePlaylistSong(username, song) {
		return this.db_reference.child(this.routes.playlist(username)).child(song.source_id).update(song);
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