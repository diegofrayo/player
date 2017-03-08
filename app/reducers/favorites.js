/* eslint consistent-return: "off" */
/* eslint indent: "off" */

// redux
import {
	ADD_SONG_TO_FAVORITES,
	FETCH_FAVORITES,
	REMOVE_SONG_FROM_FAVORITES,
	UPDATE_FAVORITE
} from 'constants/index';

// js utils
import Utilities from 'utils/utilities/Utilities';

export default function favorites(state = {}, action = {}) {

	switch (action.type) {

		case ADD_SONG_TO_FAVORITES:
			return Object.assign({}, state, {
				errorMessage: '',
				songs: Utilities.arrayIndexOf(state.songs, 'source_id', action.song.source_id) === -1 ? [action.song].concat(state.songs).sort(Utilities.sortByTitle) : state.songs,
				status: 'SUCCESS'
			});

		case FETCH_FAVORITES:
			return Object.assign({}, state, {
				errorMessage: '',
				songs: action.songs.sort(Utilities.sortByTitle),
				status: 'SUCCESS'
			});

		case REMOVE_SONG_FROM_FAVORITES:
			return Object.assign({}, state, {
				errorMessage: '',
				songs: state.songs.filter((song) => {
					if (song.source_id !== action.song.source_id) {
						return song;
					}
				}).sort(Utilities.sortByTitle),
				status: 'SUCCESS'
			});

		case UPDATE_FAVORITE:
			return Object.assign({}, state, {
				errorMessage: '',
				songs: state.songs.map((song) => {
					if (song.source_id === action.song.source_id) {
						// return Utilities.cloneObject({}, action.song);
						return action.song;
					}
					return song;
				}).sort(Utilities.sortByTitle),
				status: 'SUCCESS'
			});

		default:
			return state;

	}

}