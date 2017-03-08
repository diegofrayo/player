// npm libs
import React from 'react';

// react components
import Song from 'components/Song/Song.jsx';

// styles
import styles from 'components/Song/Song.less';

class SearchSong extends Song {

	render() {

		const {
			song
		} = this.props;

		return (
			<div className={`row ${styles.song}`}>
				<div className={`col-xs-12 ${styles.songInner}`}>
					<div className={styles.songThumbnailWrapper}>
						<img src={song.thumbnail} alt="song-thumbnail" className={styles.songThumbnailImg} />
						<p className={`text-right ${styles.songThumbnailDuration}`}>
							{song.duration}
						</p>
					</div>
					<div className={styles.songDetailsWrapper}>
						<p className={styles.songDetailsTitle} title={song.title}>
							{song.title}
						</p>
						<div className="text-center">
							<button className={styles.songButton} onClick={this.addSongToPlaylist}>
								<i className="material-icons">add</i>
							</button>
							<button className={styles.songButton} onClick={this.addSongToTop}>
								<i className="material-icons">queue_play_next</i>
							</button>
							<button className={styles.songButton} onClick={this.addSongToFavorites}>
								<i className="material-icons">favorite</i>
							</button>
						</div>
					</div>
				</div>
			</div>
		);

	}

}

export default SearchSong;