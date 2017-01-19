// import React from 'react';

import APP from 'utils/app';
import Song from 'components/Song/Song.jsx';

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

		const song = this.props.song;

		return (
			<div className="item-song row">
				<div className="item-song-child col-xs-12">
					<div className="item-song-thumbnail-wrapper">
						<img src={song.thumbnail} alt="song-thumbnail" className="item-song-thumbnail-img" />
						<p className="position-right-bottom text-right item-song-thumbnail-duration">
							{song.duration}
						</p>
					</div>
					<div className="item-song-details-wrapper">
						<p className="item-song-details-title cut-text" title={song.title}>
							{song.title}
						</p>
						<div className="item-song-buttons-wrapper text-center">
							<span className="item-song-votes badge">
								{song.votes}
							</span>
							<button onClick={this.removeSongFromTop}>
								<i className="material-icons">arrow_upward</i>
							</button>
							{/* <button onClick={this.addSongToTop}>
								<i className="material-icons">local_activity</i>
							</button> */}
							<button onClick={this.addVoteToSong}>
								<i className="material-icons">plus_one</i>
							</button>
							<button onClick={this.addSongToFavorites}>
								<i className="material-icons">favorite</i>
							</button>
							<button onClick={this.removeSongFromPlaylist}>
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