import {
	combineReducers
} from 'redux';

import {
	ADD_SONG_TO_FAVORITES,
	ADD_SONG_TO_PLAYLIST,
	ADD_SONG_TO_PLAYLIST_TOP,
	ADD_VOTE_TO_SONG,
	REMOVE_SONG_FROM_FAVORITES,
	REMOVE_SONG_FROM_PLAYLIST,
	SEARCH,
	UPDATE_PLAYLIST_SONG_TOP
} from 'actions/index';

function favorites(state = [], action = {}) {

	switch (action.type) {

		case ADD_SONG_TO_FAVORITES:

			return state.concat(action.song);

		case REMOVE_SONG_FROM_FAVORITES:

			return state.map((song) => {
				if (song.source_id !== action.song.source_id) {
					return song;
				}
				return null;
			});

		default:
			return state;

	}

}

function playlist(state = [], action = {}) {

	switch (action.type) {

		case ADD_SONG_TO_PLAYLIST:
			return state.concat(action.song);

		case ADD_SONG_TO_PLAYLIST_TOP:
			return state.concat(action.song);

		case ADD_VOTE_TO_SONG:
			return state.concat(action.song);

		case REMOVE_SONG_FROM_PLAYLIST:

			return state.map((song) => {
				if (song.source_id !== action.song.source_id) {
					return song;
				}
				return null;
			});

		case UPDATE_PLAYLIST_SONG_TOP:
			return state.concat(action.song);

		default:
			return state;

	}

}

function searchResults(state = [], action = {}) {

	switch (action.type) {

		case SEARCH:
			return [].concat(action.songs);

		default:
			return state;

	}

}

const reduxApp = combineReducers({
	favorites,
	playlist,
	searchResults
});

export default reduxApp;