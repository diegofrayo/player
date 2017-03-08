import {
	ADD_SONG_TO_FAVORITES,
	FETCH_FAVORITES,
	REMOVE_SONG_FROM_FAVORITES,
	UPDATE_FAVORITE
} from 'constants/index';

export function addSongToFavorites(song) {
	return {
		type: ADD_SONG_TO_FAVORITES,
		song
	};
}

export function fetchFavorites(songs) {
	return {
		type: FETCH_FAVORITES,
		songs
	};
}

export function removeSongFromFavorites(song) {
	return {
		type: REMOVE_SONG_FROM_FAVORITES,
		song
	};
}

export function updateFavorite(song) {
	return {
		type: UPDATE_FAVORITE,
		song
	};
}