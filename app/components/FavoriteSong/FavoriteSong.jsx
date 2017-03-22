import React from 'react';

import APP from 'utils/app';
import Song from 'components/Song/Song.jsx';

import songStyles from 'components/Song/Song.less';

class FavoriteSong extends Song {

	constructor() {
		super();
		this.removeSongFromFavorites = this.removeSongFromFavorites.bind(this);
	}

	removeSongFromFavorites() {
		APP.songs_storage.removeSongFromFavorites(APP.username, this.props.song);
	}

	render() {

		const {
			song
		} = this.props;

		return (
			<div className={`row ${songStyles.song}`}>
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
							<button className={songStyles.songButton} onClick={this.addSongToPlaylist}>
								<i className="material-icons">&#xE05C;</i>
							</button>
							<button className={songStyles.songButton} onClick={this.addSongToTop}>
								<i className="material-icons">&#xE066;</i>
							</button>
							<button className={songStyles.songButton} onClick={this.removeSongFromFavorites}>
								<i className="material-icons">&#xE14C;</i>
							</button>
						</div>
					</div>
				</div>
			</div>
		);

	}

}

export default FavoriteSong;