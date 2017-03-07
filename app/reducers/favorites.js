import {
	ADD_SONG_TO_FAVORITES,
	REMOVE_SONG_FROM_FAVORITES
} from 'constants/index';

export default function favorites(state = [], action = {}) {

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