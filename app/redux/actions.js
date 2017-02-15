/*
 * action types
 */
export const ADD_SONG = 'ADD_SONG';
export const REMOVE_SONG = 'REMOVE_SONG';
export const ADD_SONG_TO_TOP = 'ADD_SONG_TO_TOP';


/*
 * action creators
 */
export function addSong(song) {
	return {
		type: ADD_SONG,
		song
	};
}

export function removeSong(song) {
	return {
		type: REMOVE_SONG,
		song
	};
}

export function addSongToTop(song) {
	return {
		type: ADD_SONG_TO_TOP,
		song
	};
}