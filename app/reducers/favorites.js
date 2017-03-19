/* eslint consistent-return: "off" */
/* eslint indent: "off" */

// npm libs
import update from 'immutability-helper';

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
			return update(state, {
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

		case FETCH_FAVORITES:
			return update(state, {
				errorMessage: {
					$set: '',
				},
				songs: {
					$set: action.songs.sort(Utilities.sortByTitle)
				},
				status: {
					$set: 'SUCCESS',
				}
			});

		case REMOVE_SONG_FROM_FAVORITES:
			return update(state, {
				errorMessage: {
					$set: '',
				},
				songs: {
					$set: state.songs.filter((song) => {
						if (song.source_id !== action.song.source_id) {
							return song;
						}
					}).sort(Utilities.sortByTitle)
				},
				status: {
					$set: 'SUCCESS',
				}
			});

		case UPDATE_FAVORITE:
			return update(state, {
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

		default:
			return state;

	}

}