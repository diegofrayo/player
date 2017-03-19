/* eslint consistent-return: "off" */
/* eslint indent: "off" */

// npm libs
import update from 'immutability-helper';

// redux
import {
	ADD_SONG_TO_PLAYLIST,
	FETCH_PLAYLIST,
	REMOVE_SONG_FROM_PLAYLIST,
	UPDATE_PLAYLIST_SONG
} from 'constants/index';

// js utils
import Utilities from 'utils/utilities/Utilities';

export default function playlist(state = [], action = {}) {

	let newState;

	switch (action.type) {

		case ADD_SONG_TO_PLAYLIST:

			newState = update(state, {
				errorMessage: {
					$set: '',
				},
				songs: {
					$push: [action.song].sort(Utilities.sortByTitle)
				},
				status: {
					$set: 'SUCCESS',
				}
			});
			newState.songs.sort(Utilities.sortPlaylist);

			return newState;

		case FETCH_PLAYLIST:
			return update(state, {
				errorMessage: {
					$set: '',
				},
				songs: {
					$set: action.songs.sort(Utilities.sortPlaylist)
				},
				status: {
					$set: 'SUCCESS',
				}
			});

		case REMOVE_SONG_FROM_PLAYLIST:
			return update(state, {
				errorMessage: {
					$set: '',
				},
				songs: {
					$set: state.songs.filter((song) => {
						if (song.source_id !== action.song.source_id) {
							return song;
						}
					}).sort(Utilities.sortPlaylist)
				},
				status: {
					$set: 'SUCCESS',
				}
			});

		case UPDATE_PLAYLIST_SONG:

			newState = update(state, {
				errorMessage: {
					$set: '',
				},
				songs: {
					[action.index]: {
						$merge: action.song
					}
				},
				status: {
					$set: 'SUCCESS',
				}
			});
			newState.songs.sort(Utilities.sortPlaylist);

			return newState;

		default:
			return state;

	}

}