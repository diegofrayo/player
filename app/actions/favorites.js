import {
	ADD_SONG_TO_FAVORITES,
	FETCH_FAVORITES,
	REMOVE_SONG_FROM_FAVORITES,
	UPDATE_FAVORITE_OPENED_GROUP
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

export function updateFavoriteOpenedGroup(groupTitle) {
	return {
		type: UPDATE_FAVORITE_OPENED_GROUP,
		groupTitle
	};
}