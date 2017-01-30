// import React from 'react';

import APP from 'utils/app';
import Song from 'components/Song/Song.jsx';

import songStyles from 'components/Song/Song.css';
import playlistSongStyles from './PlaylistSong.css';

class PlaylistSong extends Song {

	constructor() {
		super();
		this.addVoteToSong = this.addVoteToSong.bind(this);
		this.removeSongFromPlaylist = this.removeSongFromPlaylist.bind(this);
	}

	removeSongFromPlaylist() {
		APP.songs_storage.removeSongFromPlaylist(APP.username, this.props.song);
	}

	addVoteToSong() {
		APP.songs_storage.addVoteToSong(APP.username, this.props.song);
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
						<p className={`text-right ${songStyles.songThumbnailDuration}`}>
							{song.duration}
						</p>
					</div>
					<div className={songStyles.songDetailsWrapper}>
						<p className={songStyles.songDetailsTitle} title={song.title}>
							{song.title}
						</p>
						<div className="text-center">
							<span className={`badge ${playlistSongStyles.song__playlistVotes}`}>
								{song.votes}
							</span>
							<button onClick={this.addSongToTop} className={songStyles.songButton} style={this.props.song.type === 'top' ? { color: '#d2a90b' } : {}}>
								<i className="material-icons">
									{this.props.song.type === 'top' ? 'remove_from_queue' : 'queue_play_next'}
								</i>
							</button>
							<button className={songStyles.songButton} onClick={this.addVoteToSong}>
								<i className="material-icons">plus_one</i>
							</button>
							<button className={songStyles.songButton} onClick={this.addSongToFavorites}>
								<i className="material-icons">favorite</i>
							</button>
							<button className={songStyles.songButton} onClick={this.removeSongFromPlaylist}>
								<i className="material-icons">clear</i>
							</button>
						</div>
					</div>
				</div>
			</div>
		);

	}

}

export default PlaylistSong;