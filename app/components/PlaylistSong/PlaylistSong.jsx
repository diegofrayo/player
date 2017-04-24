// npm libs
import PropTypes from 'prop-types';
import React from 'react';

// react components
import Song from 'components/Song/Song.jsx';

// js libs
import APP from 'utils/app';

// styles
import styles from './PlaylistSong.less';

class PlaylistSong extends Song {

	constructor() {
		super();
		this.addVoteToSong = this.addVoteToSong.bind(this);
		this.removeSongFromPlaylist = this.removeSongFromPlaylist.bind(this);
	}

	addVoteToSong() {
		APP.songs_storage.addVoteToSong(APP.username, this.props.song);
	}

	removeSongFromPlaylist() {
		APP.songs_storage.removeSongFromPlaylist(APP.username, this.props.song);
	}

	addSongToTop() {
		document.querySelector('#content-wrapper > div').scrollTop = 0;
		super.addSongToTop();
	}

	render() {

		const {
			song
		} = this.props;

		return (
			<Song song={song} customClass={this.props.song.type === 'top' ? styles['song--top'] : ''}>
				<span className={`badge ${styles.votes}`}>
					{song.votes}
				</span>
				<button onClick={this.addSongToTop} style={this.props.song.type === 'top' ? { color: '#d2a90b' } : {}}>
					{this.props.song.type === 'top' &&
						(<i className="material-icons">&#xE067;</i>)
					}
					{this.props.song.type !== 'top' &&
						(<i className="material-icons">&#xE066;</i>)
					}
				</button>
				<button onClick={this.addVoteToSong}>
					<i className="material-icons">&#xE800;</i>
				</button>
				<button onClick={this.addSongToFavorites}>
					<i className="material-icons">&#xE87D;</i>
				</button>
				<button onClick={this.removeSongFromPlaylist}>
					<i className="material-icons">&#xE14C;</i>
				</button>
			</Song>
		);

	}

}

delete PlaylistSong.propTypes.children;
PlaylistSong.propTypes.song.type = PropTypes.string.isRequired;
PlaylistSong.propTypes.song.votes = PropTypes.number.isRequired;

export default PlaylistSong;