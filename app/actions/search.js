import {
	SEARCH_SONGS_FAILURE,
	SEARCH_SONGS_FETCHING,
	SEARCH_SONGS_SUCCESS
} from 'constants/index';

export function searchSongsFailure(errorMessage) {
	return {
		type: SEARCH_SONGS_FAILURE,
		errorMessage
	};
}

export function searchSongsFetching() {
	return {
		type: SEARCH_SONGS_FETCHING
	};
}

export function searchSongsSuccess(songs) {
	return {
		type: SEARCH_SONGS_SUCCESS,
		songs
	};
}