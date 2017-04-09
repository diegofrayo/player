// npm libs
import PropTypes from 'prop-types';
import React from 'react';

// js utils
import APP from 'utils/app';

class Song extends React.Component {

	constructor() {
		super();
		this.addSongToFavorites = this.addSongToFavorites.bind(this);
		this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
		this.addSongToTop = this.addSongToTop.bind(this);
	}

	addSongToFavorites() {
		APP.songs_storage.addSongToFavorites(APP.username, this.props.song);
	}

	addSongToPlaylist() {
		APP.songs_storage.addSongToPlaylist(APP.username, this.props.song);
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

Song.propTypes = {
	song: PropTypes.shape({
		duration: PropTypes.string.isRequired,
		thumbnail: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired
	}).isRequired
};

export default Song;