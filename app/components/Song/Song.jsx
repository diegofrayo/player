// import React from 'react';

import APP from 'utils/app';

class Song extends React.Component {

	constructor() {
		super();
		this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
		this.addSongToFavorites = this.addSongToFavorites.bind(this);
		this.addSongToTop = this.addSongToTop.bind(this);
	}

	addSongToPlaylist() {
		APP.songs_storage.addSongToPlaylist(APP.username, this.props.song);
	}

	addSongToFavorites() {
		APP.songs_storage.addSongToFavorites(APP.username, this.props.song);
	}

	addSongToTop() {
		APP.songs_storage.addSongToTop(APP.username, this.props.song);
	}

	render() {

		return (
			<div className="row">{''}</div>
		);

	}

}

export default Song;