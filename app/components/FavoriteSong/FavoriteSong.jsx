// npm libs
import React from 'react';

// js utils
import APP from 'utils/app';
import Song from 'components/Song/Song.jsx';

// styles
import styles from 'components/Song/Song.less';

class FavoriteSong extends Song {

	constructor() {

		super();

		this.editTitle = this.editTitle.bind(this);
		this.onClickTitle = this.onClickTitle.bind(this);
		this.removeSongFromFavorites = this.removeSongFromFavorites.bind(this);

		this.state = {
			showInput: false
		};
	}

	componentDidUpdate() {
		if (this.state.showInput === true) {
			this.input.value = this.props.song.title;
			this.input.focus();
		}
	}

	removeSongFromFavorites() {
		APP.songs_storage.removeSongFromFavorites(APP.username, this.props.song);
	}

	editTitle(event) {

		if (event.key === 'Enter') {

			this.setState({
				showInput: false
			});

			const title = this.input.value;

			if (title && title !== this.props.song.title) {

				APP.songs_storage.editFavorite(APP.username, this.props.song, {
					title
				});

			}
		}
	}

	onClickTitle() {
		this.setState({
			showInput: true
		});
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
						<div>
							<p className={`${styles.songDetailsTitle} u-cut-text`} title={song.title} onClick={this.onClickTitle} style={this.state.showInput === false ? { display: 'block' } : { display: 'none' }}>
								{song.title}
							</p>
							<input type="text" className={`form-control`} onKeyPress={this.editTitle} ref={(input) => { this.input = input; }} style={this.state.showInput === true ? { display: 'block', marginTop: '10px' } : { display: 'none' }} />
						</div>
						<div className="text-center" style={this.state.showInput === true ? { display: 'none' } : { display: 'block' }}>
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