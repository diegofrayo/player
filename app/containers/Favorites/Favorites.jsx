// npm libs
import React from 'react';

// js utils
import APP from 'utils/app';
import Utilities from 'utils/utilities/Utilities';

// react components
import FavoriteSong from 'components/FavoriteSong/FavoriteSong.jsx';
import SongsListInfo from 'components/SongsListInfo/SongsListInfo.jsx';
import Spinner from 'components/Spinner/Spinner.jsx';

// redux
import {
	updateFavoriteOpenedGroup as 	updateFavoriteOpenedGroupAction
} from 'actions/favorites';
import store from 'store/index';

// styles
import styles from './Favorites.less';

class Favorites extends React.Component {

	constructor() {
		super();
		this.state = store.getState().favorites;
		this.unsubscribe = store.subscribe(this.handleSubscribeChanges.bind(this));
		this.openGroupOfSongs = this.openGroupOfSongs.bind(this);
	}

	componentDidMount() {
		Utilities.updatePageTitle('favorites');
		APP.songs_storage.fetchSongsList('favorites', APP.username);
		APP.songs_storage.initFavoritesWatchers(APP.username);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	handleSubscribeChanges() {
		this.setState(store.getState().favorites);
	}

	openGroupOfSongs(groupTitle) {
		store.dispatch(updateFavoriteOpenedGroupAction(groupTitle));
	}

	renderFavorites(songs) {

		const songsOutput = Object.keys(songs.groups).sort().map((key) => {

			const groupOfSongs = songs.groups[key];

			return (
				<div className={`${styles.artistContainer} u-box-shadow`} key={key}>
					<h2 className={styles.artistContainerTitle} onClick={() => { this.openGroupOfSongs(groupOfSongs.title); }}>
						{groupOfSongs.title}
						{groupOfSongs.is_opened === true &&
							(<i className={`material-icons u-material-icons--28 u-position-right-top ${styles.expandButton}`}>&#xE316;</i>)
						}
						{groupOfSongs.is_opened !== true &&
							(<i className={`material-icons u-material-icons--28 u-position-right-top ${styles.expandButton}`}>&#xE313;</i>)
						}
					</h2>

					<div className={styles.artistContainerSongs} style={{ display: groupOfSongs.is_opened === true ? 'block' : 'none' }}>
						{
							groupOfSongs.songs.map(song => <FavoriteSong song={song} key={song.source_id} />)
						}
					</div>
				</div>
			);
		});

		return (
			<div>
				<SongsListInfo>
					Total number of songs: <strong>{songs.number}</strong>
				</SongsListInfo>
				<div>
					{songsOutput}
				</div>
			</div>
		);
	}

	render() {
		return (
			<div>
				{
					this.state.status === 'SUCCESS' && this.renderFavorites(this.state.songs)
				}
				{
					this.state.status === 'FETCHING' &&	<Spinner />
				}
				{
					this.state.status === 'FAILURE' && <div>{this.state.errorMessage}</div>
				}
			</div>
		);
	}

}

export default Favorites;