import React from 'react';

import APP from 'utils/app';
import Song from 'components/Song/Song.jsx';

import styles from 'components/Song/Song.less';

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
			<div className={`row ${styles.song}`}>
				<div className={`col-xs-12 ${styles.songInner}`}>
					<div className={styles.songThumbnailWrapper}>
						<img src={song.thumbnail} alt="song-thumbnail" className={styles.songThumbnailImg} />
						<p className={`text-right u-position-right-bottom u-gradient ${styles.songThumbnailDuration}`}>
							{song.duration}
						</p>
					</div>
					<div className={styles.songDetailsWrapper}>
						<p className={`${styles.songDetailsTitle} u-cut-text`} title={song.title}>
							{song.title}
						</p>
						<div className="text-center">
							<button className={styles.songButton} onClick={this.addSongToPlaylist}>
								<i className="material-icons">&#xE05C;</i>
							</button>
							<button className={styles.songButton} onClick={this.addSongToTop}>
								<i className="material-icons">&#xE066;</i>
							</button>
							<button className={styles.songButton} onClick={this.removeSongFromFavorites}>
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