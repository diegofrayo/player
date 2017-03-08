// npm libs
import firebase from 'firebase';

// js utils
import APP from 'utils/app.js';
import Utilities from 'utils/utilities/Utilities';

// redux
import store from 'store/index';
import {
	addSongToFavorites,
	fetchFavorites,
	removeSongFromFavorites,
	updateFavorite
} from 'actions/favorites';
import {
	addSongToPlaylist,
	fetchPlaylist,
	removeSongFromPlaylist,
	updatePlaylistSong
} from 'actions/playlist';

firebase.initializeApp({
	databaseURL: '@@firebase_database_url',
	authDomain: '@@firebase_auth_domain',
	apiKey: '@@firebase_api_key'
});

export class FirebaseImplementationClass {

	constructor(firebaseConfig) {
		this.reference = firebaseConfig.reference;
		this.routes = firebaseConfig.routes;
	}

	fetchSongsList(listName, username) {

		let route;
		let action;

		if (listName === 'favorites') {
			action = fetchFavorites;
			route = this.routes.favorites(username);
		} else {
			action = fetchPlaylist;
			route = this.routes.playlist(username);
		}

		this.reference.child(route)
			.once('value', (snapshot) => {

				let songs = [];

				if (snapshot.exists()) {
					songs = Utilities.jsonToArray(snapshot.val());
				}

				store.dispatch(action(songs));
			});

	}

	createSongsListWatcher(listName, username) {

		let actions;
		let currentStore;
		let reference;

		if (listName === 'favorites') {
			currentStore = store.getState().favorites;
			reference = this.reference.child(this.routes.favorites(username));
			actions = {
				addSong: addSongToFavorites,
				removeSong: removeSongFromFavorites,
				updateSong: updateFavorite
			};
		} else {
			currentStore = store.getState().playlist;
			reference = this.reference.child(this.routes.playlist(username));
			actions = {
				addSong: addSongToPlaylist,
				removeSong: removeSongFromPlaylist,
				updateSong: updatePlaylistSong
			};
		}

		reference.on('child_added', (snapshot) => {

			if (currentStore.status === 'FETCHING') {
				return;
			}

			let song = snapshot.val();

			if (song) {
				store.dispatch(actions.addSong(song));
			}

			song = null;
		});

		reference.on('child_changed', (snapshot) => {

			if (currentStore.status === 'FETCHING') {
				return;
			}

			let changedSong = snapshot.val();

			if (changedSong) {
				store.dispatch(actions.updateSong(changedSong));
			}

			changedSong = null;
		});

		reference.on('child_removed', (snapshot) => {

			if (currentStore.status === 'FETCHING') {
				return;
			}

			let removedSong = snapshot.val();

			if (removedSong) {
				store.dispatch(actions.removeSong(removedSong));
			}

			removedSong = null;
		});

	}

	initPlaylistWatchers(username) {
		this.createSongsListWatcher('playlist', username);
	}

	initFavoritesWatchers(username) {
		this.createSongsListWatcher('favorites', username);
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

				this.reference.child(this.routes.playlist(username)).child(song.source_id)
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
		return this.reference.child(this.routes.playlist(username)).child(song.source_id).remove();
	}

	addSongToFavorites(username, song) {

		const newSong = Utilities.cloneObject(song);

		newSong.timestamp = new Date().getTime();

		delete newSong.is_playing;
		delete newSong.type;
		delete newSong.votes;

		return this.reference.child(this.routes.favorites(username)).child(song.source_id).update(newSong);
	}

	removeSongFromFavorites(username, song) {
		return this.reference.child(this.routes.favorites(username)).child(song.source_id).remove();
	}

	addSongToTop(username, song) {

		const updateSong = (type) => {

			const newSong = Utilities.cloneObject(song);
			newSong.type = type || 'top';

			this.reference.child(this.routes.playlist(username)).child(song.source_id)
				.once('value', (snapshot) => {

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

			const playlist = store.getState().playlist.songs;
			const songTopIndex = Utilities.arrayIndexOf(playlist, 'type', 'top');

			if (songTopIndex !== -1) {

				const songTop = Utilities.cloneObject(playlist[songTopIndex]);
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

		const newSong = Utilities.cloneObject(song);
		newSong.votes += 1;

		return this.updatePlaylistSong(username, newSong);
	}

	updatePlaylistSong(username, song) {
		return this.reference.child(this.routes.playlist(username)).child(song.source_id).update(song);
	}

}

export const FIREBASE_CONNECTION = {
	reference: firebase.database().ref(),
	routes: {
		favorites: username => `player/${username}/favorites`,
		playlist: username => `player/${username}/playlist`
	}
};