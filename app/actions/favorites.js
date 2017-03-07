import {
	ADD_SONG_TO_FAVORITES,
	REMOVE_SONG_FROM_FAVORITES
} from 'constants/index';

export function removeSongfromPlaylist(song) {
	return {
		type: REMOVE_SONG_FROM_PLAYLIST,
		song
	};
}