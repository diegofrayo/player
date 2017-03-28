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

	switch (action.type) {

		case ADD_SONG_TO_PLAYLIST:
			return update(state, {
				errorMessage: {
					$set: '',
				},
				songs: {
					$apply: (songs) => {
						const newSongs = update(songs, {
							$push: [action.song]
						});
						return newSongs.sort(Utilities.sortPlaylist);
					}
				},
				status: {
					$set: 'SUCCESS',
				}
			});

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
			return update(state, {
				errorMessage: {
					$set: '',
				},
				songs: {
					$apply: (songs) => {
						const newSongs = update(songs, {
							[action.index]: {
								$merge: action.song
							}
						});
						return newSongs.sort(Utilities.sortPlaylist);
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