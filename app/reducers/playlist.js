/* eslint consistent-return: "off" */
/* eslint indent: "off" */

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

	switch (action.type) {

		case ADD_SONG_TO_PLAYLIST:
			return Object.assign({}, state, {
				errorMessage: '',
				songs: Utilities.arrayIndexOf(state.songs, 'source_id', action.song.source_id) === -1 ? [...state.songs, action.song].sort(Utilities.sortPlaylist) : state.songs,
				status: 'SUCCESS'
			});

		case FETCH_PLAYLIST:
			return Object.assign({}, state, {
				errorMessage: '',
				songs: [...action.songs].sort(Utilities.sortPlaylist),
				status: 'SUCCESS'
			});

		case REMOVE_SONG_FROM_PLAYLIST:
			return Object.assign({}, state, {
				errorMessage: '',
				songs: state.songs.filter((song) => {
					if (song.source_id !== action.song.source_id) {
						return song;
					}
				}).sort(Utilities.sortPlaylist),
				status: 'SUCCESS'
			});

		case UPDATE_PLAYLIST_SONG:
			return Object.assign({}, state, {
				errorMessage: '',
				songs: state.songs.map((song) => {
					if (song.source_id === action.song.source_id) {
						// return Utilities.cloneObject({}, action.song);
						return action.song;
					}
					return song;
				}).sort(Utilities.sortPlaylist),
				status: 'SUCCESS'
			});

		default:
			return state;

	}

}