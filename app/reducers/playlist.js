import {
	ADD_SONG_TO_PLAYLIST,
	ADD_SONG_TO_PLAYLIST_TOP,
	ADD_VOTE_TO_SONG,
	REMOVE_SONG_FROM_PLAYLIST,
	UPDATE_PLAYLIST_SONG_TOP
} from 'constants/index';

export default function playlist(state = [], action = {}) {

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