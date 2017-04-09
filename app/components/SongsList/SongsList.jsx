// npm libs
import PropTypes from 'prop-types';
import React from 'react';

// react components
import FavoriteSong from 'components/FavoriteSong/FavoriteSong.jsx';
import SearchSong from 'components/SearchSong/SearchSong.jsx';

// styles
import styles from './SongsList.less';

class SongsList extends React.Component {

	render() {

		const type = this.props.type;
		const songs = this.props.songsList;

		let songsOutput;

		if (type === 'favorites') {

			songsOutput = songs.map(song => <FavoriteSong song={song} key={song.source_id} />);

			return (
				<div>
					<p className={styles.songsListInfo}>
						<i className={`material-icons ${styles.infoIcon}`}>&#xE88E;</i>
						<span>
							Total number of songs: {songs.length}
						</span>
					</p>
					<div className={`u-box-shadow ${styles.songsOutputContainer}`}>
						{songsOutput}
					</div>
				</div>
			);

		} else if (type === 'search') {

			if (songs.length === 0) {
				return null;
			}

			songsOutput = songs.map(song => <SearchSong song={song} key={song.source_id} />);

			return (
				<div>
					<p className={styles.songsListInfo}>
						<i className={`material-icons ${styles.infoIcon}`}>&#xE88E;</i>
						<span>
							{this.props.children}
						</span>
					</p>
					<div className={styles.songsOutputContainer}>
						{songsOutput}
					</div>
				</div>
			);

		}

		return null;

	}

}

SongsList.propTypes = {
	children: PropTypes.node,
	songsList: PropTypes.array.isRequired,
	type: PropTypes.string.isRequired
};

SongsList.defaultProps = {
	children: ''
};

export default SongsList;