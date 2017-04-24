// npm libs
import PropTypes from 'prop-types';
import React from 'react';

// js utils
import APP from 'utils/app';

// react components
import Song from 'components/Song/Song.jsx';

// styles
import styles from 'components/Song/Song.less';

const Title = ({
	editTitle,
	onClickTitle,
	showInput,
	title
}) => (
	<div>
		<p className={`${styles.detailsTitle} u-cut-text`} title={title} onClick={onClickTitle} style={showInput === false ? { display: 'block' } : { display: 'none' }}>
			{title}
		</p>
		<input type="text" className={`form-control`} onKeyPress={editTitle} style={showInput === true ? { display: 'block', marginTop: '10px' } : { display: 'none' }} />
	</div>
);

Title.propTypes = {
	editTitle: PropTypes.func.isRequired,
	onClickTitle: PropTypes.func.isRequired,
	showInput: PropTypes.bool,
	title: PropTypes.string.isRequired
};

Title.defaultProps = {
	showInput: false
};

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

			this.input.blur();

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

		const titleComponent = <Title	editTitle={this.editTitle} onClickTitle={this.onClickTitle} showInput={this.state.showInput} title={song.title} />;

		return (
			<Song song={song} hideButtons={this.state.showInput} titleComponent={titleComponent}>
				<button onClick={this.addSongToPlaylist}>
					<i className="material-icons">&#xE05C;</i>
				</button>
				<button onClick={this.addSongToTop}>
					<i className="material-icons">&#xE066;</i>
				</button>
				<button onClick={this.removeSongFromFavorites}>
					<i className="material-icons">&#xE14C;</i>
				</button>
			</Song>
		);

	}

}

delete FavoriteSong.propTypes.children;

export default FavoriteSong;