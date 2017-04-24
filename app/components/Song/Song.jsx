// npm libs
import PropTypes from 'prop-types';
import React from 'react';

// js utils
import APP from 'utils/app';

// react components
import SongBody from 'components/Song/Body/Body.jsx';
import SongThumbnail from 'components/Song/Thumbnail/Thumbnail.jsx';

// styles
import styles from './Song.less';

class Song extends React.Component {

	constructor() {
		super();
		this.addSongToFavorites = this.addSongToFavorites.bind(this);
		this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
		this.addSongToTop = this.addSongToTop.bind(this);
	}

	addSongToFavorites() {
		APP.songs_storage.addSongToFavorites(APP.username, this.props.song);
	}

	addSongToPlaylist() {
		APP.songs_storage.addSongToPlaylist(APP.username, this.props.song);
	}

	addSongToTop() {
		APP.songs_storage.addSongToTop(APP.username, this.props.song);
	}

	render() {

		const {
			children,
			customClass,
			song,
			titleComponent
		} = this.props;

		return (
			<div className={`${styles.songWrapper} ${customClass}`}>
				<SongThumbnail duration={song.duration} thumbnailUrl={song.thumbnail} />
				<SongBody title={song.title} titleComponent={titleComponent}>
					{children.map(child => child)}
				</SongBody>
			</div>
		);
	}

}

Song.propTypes = {
	children: PropTypes.array.isRequired,
	customClass: PropTypes.string,
	song: PropTypes.shape({
		duration: PropTypes.string.isRequired,
		thumbnail: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired
	}).isRequired,
	titleComponent: PropTypes.element
};

Song.defaultProps = {
	customClass: ''
};

export default Song;