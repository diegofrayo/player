// npm libs
import PropTypes from 'prop-types';
import React from 'react';

// react components
import Song from 'components/Song/Song.jsx';

// js libs
import APP from 'utils/app';

// styles
import songStyles from 'components/Song/Song.less';
import playlistSongStyles from './PlaylistSong.less';

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
			<div className={this.props.song.type === 'top' ? `row ${songStyles.song} ${playlistSongStyles['song--top']}` : `row ${songStyles.song}`}>
				<div className={`col-xs-12 ${songStyles.songInner}`}>
					<div className={songStyles.songThumbnailWrapper}>
						<img src={song.thumbnail} alt="song-thumbnail" className={songStyles.songThumbnailImg} />
						<p className={`text-right u-position-right-bottom u-gradient ${songStyles.songThumbnailDuration}`}>
							{song.duration}
						</p>
					</div>
					<div className={songStyles.songDetailsWrapper}>
						<p className={`${songStyles.songDetailsTitle} u-cut-text`} title={song.title}>
							{song.title}
						</p>
						<div className="text-center">
							<span className={`badge ${playlistSongStyles.song__playlistVotes}`}>
								{song.votes}
							</span>
							<button onClick={this.addSongToTop} className={songStyles.songButton} style={this.props.song.type === 'top' ? { color: '#d2a90b' } : {}}>
								{this.props.song.type === 'top' &&
									(<i className="material-icons">&#xE067;</i>)
								}
								{this.props.song.type !== 'top' &&
									(<i className="material-icons">&#xE066;</i>)
								}
							</button>
							<button className={songStyles.songButton} onClick={this.addVoteToSong}>
								<i className="material-icons">&#xE800;</i>
							</button>
							<button className={songStyles.songButton} onClick={this.addSongToFavorites}>
								<i className="material-icons">&#xE87D;</i>
							</button>
							<button className={songStyles.songButton} onClick={this.removeSongFromPlaylist}>
								<i className="material-icons">&#xE14C;</i>
							</button>
						</div>
					</div>
				</div>
			</div>
		);

	}

}

PlaylistSong.propTypes.song.type = PropTypes.string.isRequired;
PlaylistSong.propTypes.song.votes = PropTypes.number.isRequired;

export default PlaylistSong;