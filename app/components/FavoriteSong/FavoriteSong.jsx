// import React from 'react';

import APP from 'utils/app';
import Song from 'components/Song/Song.jsx';

class SearchSong extends Song {

	constructor() {
		super();
		this.removeSongFromFavorites = this.removeSongFromFavorites.bind(this);
	}

	removeSongFromFavorites() {
		APP.songs_storage.removeSongFromFavorites(APP.username, this.props.song);
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
							<button onClick={this.addSongToPlaylist}>
								<i className="material-icons">add</i>
							</button>
							<button onClick={this.addSongToTop}>
								<i className="material-icons">local_activity</i>
							</button>
							<button onClick={this.removeSongFromFavorites}>
								<i className="material-icons">clear</i>
							</button>
						</div>
					</div>
				</div>
			</div>
		);

	}

}

export default SearchSong;