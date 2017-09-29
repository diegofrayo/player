// npm libs
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// js utils
import APP from 'utils/app';

// react components
import SongBody from './components/Body';
import SongThumbnail from './components/Thumbnail';

// styles
import styles from './Song.less';

class Song extends React.Component {

	constructor() {
		super();
		this.addSongToFavorites = this.addSongToFavorites.bind(this);
		this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
		this.addSongToTop = this.addSongToTop.bind(this);
	}

	animate(event, eventName) {
		if (event.currentTarget.getAttribute('data-dont-animate')) return;
		let elementClicked = event.currentTarget.querySelectorAll('i')[0];
		elementClicked.classList.add(styles[`${eventName}Animation`]);
		setTimeout(() => {
			elementClicked.classList.remove(styles[`${eventName}Animation`]);
			elementClicked = null;
		}, 2000);
	}

	addSongToFavorites(event) {
		APP.songs_storage.addSongToFavorites(APP.username, this.props.song);
		this.animate(event, 'addSongToFavorites');
	}

	addSongToPlaylist(event) {
		APP.songs_storage.addSongToPlaylist(APP.username, this.props.song);
		this.animate(event, 'addSongToPlaylist');
	}

	addSongToTop(event) {
		APP.songs_storage.addSongToTop(APP.username, this.props.song);
		this.animate(event, 'addSongToTop');
	}

	render() {

		const {
			children,
			customClass,
			hideButtons,
			song,
			titleComponent
		} = this.props;

		return (
			<div className={classnames(styles.songWrapper, customClass)}>
				<SongThumbnail duration={song.duration} thumbnailUrl={song.thumbnail} />
				<SongBody hideButtons={hideButtons} title={song.title} titleComponent={titleComponent}>
					{children.map(child => child)}
				</SongBody>
			</div>
		);
	}

}

Song.propTypes = {
	children: PropTypes.array.isRequired,
	customClass: PropTypes.string,
	hideButtons: PropTypes.bool,
	song: PropTypes.shape({
		duration: PropTypes.string.isRequired,
		thumbnail: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired
	}).isRequired,
	titleComponent: PropTypes.element
};

Song.defaultProps = {
	customClass: '',
	hideButtons: false,
	titleComponent: null
};

export default Song;