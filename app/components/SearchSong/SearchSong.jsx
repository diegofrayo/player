// import React from 'react';

import Song from 'components/Song/Song.jsx';

import songStyles from 'components/Song/Song.css';

class SearchSong extends Song {

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
								<i className="material-icons">add</i>
							</button>
							<button className={songStyles.songButton} onClick={this.addSongToTop}>
								<i className="material-icons">queue_play_next</i>
							</button>
							<button className={songStyles.songButton} onClick={this.addSongToFavorites}>
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