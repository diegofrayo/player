// npm libs
import classnames from 'classnames';
import React from 'react';
import {
	Transition as CSSTransitionGroup
} from 'react-transition-group';

// js utils
import APP from 'utils/app';
import Utilities from 'utils/utilities/Utilities';

// react components
import FavoriteSong from 'components/FavoriteSong';
import SongsListInfo from 'components/SongsListInfo';
import Spinner from 'components/Spinner';

// redux
import {
	updateFavoriteOpenedGroup as updateFavoriteOpenedGroupAction
} from 'actions/favorites';
import store from 'store';

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

	openGroupOfSongs(event) {
		store.dispatch(updateFavoriteOpenedGroupAction(event.currentTarget.getAttribute('data-title')));
		document.querySelector('#content-wrapper > div').scrollTop = event.currentTarget.offsetParent.offsetTop - 10;
	}

	renderFavorites(songs) {

		const transitionStyles = {
			entering: styles['artistContainerSongsContent--visible'],
			entered: styles['artistContainerSongsContent--visible']
		};

		const songsOutput = Object.keys(songs.groups).sort().map((key) => {

			const groupOfSongs = songs.groups[key];

			return (
				<div className={classnames('u-box-shadow', styles.artistContainer)} key={key}>
					<h2 className={styles.artistContainerTitle} onClick={this.openGroupOfSongs} data-title={groupOfSongs.title}>

						{ groupOfSongs.title } ({ groupOfSongs.songs.length })

						{ groupOfSongs.is_opened === true ?
							(<i className={classnames('material-icons u-material-icons--28 u-position-right-top', styles.expandButton)}>&#xE316;</i>) :
							(<i className={classnames('material-icons u-material-icons--28 u-position-right-top', styles.expandButton)}>&#xE313;</i>)
						}

					</h2>

					<div className={classnames(styles.artistContainerSongs)}>
						<CSSTransitionGroup in={groupOfSongs.is_opened} timeout={500}>
							{state => (
								<div className={classnames(styles.artistContainerSongsContent, transitionStyles[state])}>
									{ groupOfSongs.is_opened && groupOfSongs.songs.map(song => <FavoriteSong song={song} key={song.source_id} />) }
								</div>
							)}
						</CSSTransitionGroup>
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