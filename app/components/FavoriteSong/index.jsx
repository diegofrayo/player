// npm libs
import classnames from 'classnames';
import React from 'react';

// js utils
import APP from 'utils/app';

// react components
import Song from 'components/Song';
import FavoriteSongTitle from './components/FavoriteSongTitle';

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
			<FavoriteSongTitle onClickTitle={this.onClickTitle} showInput={this.state.showInput} title={song.customTitle || song.title}>
				<input type="text" onKeyPress={this.onEditTitle} className={classnames({ 'u-hide': !this.state.showInput }, { 'u-display-block': this.state.showInput })} ref={(input) => { this.input = input; }} />
			</FavoriteSongTitle>
		);

		return (
			<Song song={song} hideButtons={this.state.showInput} titleComponent={titleComponent}>
				<button onClick={this.addSongToPlaylist}>
					<i className={classnames('material-icons')}>&#xE05C;</i>
				</button>
				<button onClick={this.addSongToTop}>
					<i className={classnames('material-icons')}>&#xE066;</i>
				</button>
				<button onClick={this.removeSongFromFavorites}>
					<i className={classnames('material-icons')}>&#xE14C;</i>
				</button>
			</Song>
		);

	}

}

delete FavoriteSong.propTypes.children;

export default FavoriteSong;