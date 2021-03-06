// npm libs
import classnames from 'classnames';
import React from 'react';

// react components
import Song from 'components/Song';

class SearchSong extends Song {

	constructor() {
		super();
		this.addSongToFavorites = this.addSongToFavorites.bind(this);
		this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
		this.addSongToTop = this.addSongToTop.bind(this);
	}

	render() {

		const {
			song
		} = this.props;

		return (
			<Song song={song}>
				<button onClick={this.addSongToPlaylist} id={`addSongToPlaylist-btn-${song.source_id}`}>
					<i className={classnames('material-icons')}>&#xE05C;</i>
				</button>
				<button onClick={this.addSongToTop} id={`addSongToTop-btn-${song.source_id}`}>
					<i className={classnames('material-icons')}>&#xE066;</i>
				</button>
				<button onClick={this.addSongToFavorites} id={`addSongToFavorites-btn-${song.source_id}`}>
					<i className={classnames('material-icons')}>&#xE87D;</i>
				</button>
			</Song>
		);

	}

}

delete SearchSong.propTypes.children;

export default SearchSong;