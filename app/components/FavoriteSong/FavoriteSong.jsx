// npm libs
import PropTypes from 'prop-types';
import React from 'react';

// js utils
import APP from 'utils/app';

// react components
import Song from 'components/Song/Song.jsx';

// styles
import styles from 'components/Song/Title/Title.less';

const Title = ({
	children,
	onClickTitle,
	showInput,
	title
}) => (
	<div>
		<p className={`${styles.title} u-cut-text`} title={title} onClick={onClickTitle} style={showInput === false ? { display: 'block' } : { display: 'none' }}>
			{title}
		</p>
		{children}
	</div>
);

Title.propTypes = {
	children: PropTypes.element.isRequired,
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

		this.onEditTitle = this.onEditTitle.bind(this);
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

	onEditTitle(event) {

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

		const titleComponent = (
			<Title onClickTitle={this.onClickTitle} showInput={this.state.showInput} title={song.title}>
				<input type="text" onKeyPress={this.onEditTitle} style={this.state.showInput === true ? { display: 'block' } : { display: 'none' }} ref={(input) => { this.input = input; }} />
			</Title>
		);

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