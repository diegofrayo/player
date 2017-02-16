import {
	ADD_SONG_TO_PLAYLIST,
	REMOVE_SONG_FROM_PLAYLIST
} from 'actions/index';

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