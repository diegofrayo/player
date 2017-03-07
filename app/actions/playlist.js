import {
	ADD_SONG_TO_PLAYLIST,
	ADD_SONG_TO_PLAYLIST_TOP,
	ADD_VOTE_TO_SONG,
	REMOVE_SONG_FROM_PLAYLIST,
	UPDATE_PLAYLIST_SONG_TOP
} from 'constants/index';

export function addSongToPlaylist(song) {
	return {
		type: ADD_SONG_TO_PLAYLIST,
		song
	};
}

export function removeSongfromPlaylist(song) {
	return {
		type: REMOVE_SONG_FROM_PLAYLIST,
		song
	};
}