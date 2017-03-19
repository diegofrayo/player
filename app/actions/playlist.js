import {
	ADD_SONG_TO_PLAYLIST,
	FETCH_PLAYLIST,
	REMOVE_SONG_FROM_PLAYLIST,
	UPDATE_PLAYLIST_SONG
} from 'constants/index';

export function addSongToPlaylist(song) {
	return {
		type: ADD_SONG_TO_PLAYLIST,
		song
	};
}

export function fetchPlaylist(songs) {
	return {
		type: FETCH_PLAYLIST,
		songs
	};
}

export function removeSongFromPlaylist(song) {
	return {
		type: REMOVE_SONG_FROM_PLAYLIST,
		song
	};
}

export function updatePlaylistSong(song, index) {
	return {
		type: UPDATE_PLAYLIST_SONG,
		index,
		song
	};
}