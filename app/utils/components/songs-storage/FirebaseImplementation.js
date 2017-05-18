// npm libs
import firebase from 'firebase';

// js utils
import APP from 'utils/app';
import Utilities from 'utils/utilities/Utilities';

// redux
import store from 'store';
import {
	addSongToFavorites as addSongToFavoritesAction,
	fetchFavorites as fetchFavoritesAction,
	removeSongFromFavorites as removeSongFromFavoritesAction
} from 'actions/favorites';
import {
	addSongToPlaylist as addSongToPlaylistAction,
	fetchPlaylist as fetchPlaylistAction,
	removeSongFromPlaylist as removeSongFromPlaylistAction,
	updatePlaylistSong as updatePlaylistSongAction
} from 'actions/playlist';

if (firebase.apps === undefined || (firebase.apps && firebase.apps.length === 0)) {
	firebase.initializeApp({
		databaseURL: APP_SETTINGS.firebase_database_url,
		authDomain: APP_SETTINGS.firebase_auth_domain,
		apiKey: APP_SETTINGS.firebase_api_key,
	});
}

export class FirebaseImplementationClass {

	constructor(firebaseConfig) {
		this.reference = firebaseConfig.reference;
		this.routes = firebaseConfig.routes;
	}

	fetchSongsList(listName, username) {

		let route;
		let action;

		if (listName === 'favorites') {

			action = fetchFavoritesAction;
			route = this.routes.favorites(username);

			if (store.getState().favorites.status === 'SUCCESS') {
				return;
			}

		} else {
			action = fetchPlaylistAction;
			route = this.routes.playlist(username);
		}

		this.reference.child(route)
			.once('value', (snapshot) => {

				let songs = [];

				if (snapshot.exists()) {
					songs = Utilities.jsonToArray(snapshot.val());
				}

				if (listName === 'favorites') {
					songs = Utilities.structureFavoritesList(songs.sort(Utilities.sortByTitle));
				}

				store.dispatch(action(songs));
			});

	}

	initPlaylistWatchers(username) {

		const reference = this.reference.child(this.routes.playlist(username));

		reference.on('child_added', (snapshot) => {

			const state = store.getState().playlist;

			if (state.status === 'FETCHING') {
				return;
			}

			let song = snapshot.val();

			if (song && Utilities.arrayIndexOf(state.songs, 'source_id', song.source_id) === -1) {
				store.dispatch(addSongToPlaylistAction(song));
			}

			song = null;
		});

		reference.on('child_changed', (snapshot) => {

			const state = store.getState().playlist;

			if (state.status === 'FETCHING') {
				return;
			}

			let changedSong = snapshot.val();
			const index = Utilities.arrayIndexOf(state.songs, 'source_id', changedSong.source_id);

			if (changedSong && index !== -1) {
				store.dispatch(updatePlaylistSongAction(changedSong, index));
			}

			changedSong = null;
		});

		reference.on('child_removed', (snapshot) => {

			const state = store.getState().playlist;

			if (state.status === 'FETCHING') {
				return;
			}

			let removedSong = snapshot.val();

			if (removedSong) {
				store.dispatch(removeSongFromPlaylistAction(removedSong));
			}

			removedSong = null;
		});

	}

	initFavoritesWatchers(username) {

		if (store.getState().favorites.status === 'FETCHING') {

			const reference = this.reference.child(this.routes.favorites(username));

			reference.on('child_added', (snapshot) => {

				const state = store.getState().favorites;

				if (state.status === 'FETCHING') {
					return;
				}

				let song = snapshot.val();

				if (song && state.songs.source_ids.indexOf(song.source_id) === -1) {
					store.dispatch(addSongToFavoritesAction(song));
				}

				song = null;
			});

			reference.on('child_changed', (snapshot) => {

				const state = store.getState().favorites;

				if (state.status === 'FETCHING') {
					return;
				}

				let changedSong = snapshot.val();

				if (changedSong && state.songs.source_ids.indexOf(changedSong.source_id) !== -1) {
					store.dispatch(removeSongFromFavoritesAction(changedSong));
					store.dispatch(addSongToFavoritesAction(changedSong));
				}

				changedSong = null;
			});

			reference.on('child_removed', (snapshot) => {

				const state = store.getState().favorites;

				if (state.status === 'FETCHING') {
					return;
				}

				let removedSong = snapshot.val();

				if (removedSong) {
					store.dispatch(removeSongFromFavoritesAction(removedSong));
				}

				removedSong = null;
			});

		}
	}

	addSongToPlaylist(username, song, omitIfExists) {

		const promise = APP.promise.createPromise((resolve) => {

			const addSong = () => {

				const newSong = Utilities.createPlaylistSong(song);

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
		const newSong = Utilities.createFavoriteSong(song);
		return this.reference.child(this.routes.favorites(username)).child(song.source_id).set(newSong);
	}

	removeSongFromFavorites(username, song) {
		return this.reference.child(this.routes.favorites(username)).child(song.source_id).remove();
	}

	editFavorite(username, song, newAttrs) {
		const newSong = Utilities.cloneObject({}, Utilities.createFavoriteSong(song), newAttrs);
		return this.reference.child(this.routes.favorites(username)).child(newSong.source_id).update(newSong);
	}

	addSongToTop(username, song) {

		const updateSong = (type) => {

			const newSong = Utilities.createPlaylistSong(song);
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

				const songTop = Utilities.createPlaylistSong(playlist[songTopIndex]);
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

		const newSong = Utilities.createPlaylistSong(song);
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