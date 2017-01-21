import APP from 'utils/app';
import SongsList from 'components/SongsList/SongsList.jsx';

class Favorites extends React.Component {

	constructor() {

		super();

		this.favoritesList = APP.songs_storage.getFavorites();

		this.state = {
			favoritesList: this.favoritesList
		};

	}

	componentDidMount() {

		document.title = 'player | Favoritos';
		document.getElementById('header-title').innerHTML = 'Favoritos';

		APP.songs_storage.initFavoritesWatchers();

		APP.songs_storage.registerCallbacks('favorites', {
			child_added: this.updatePlaylist.bind(this),
			child_changed: this.updatePlaylist.bind(this),
			child_removed: this.updatePlaylist.bind(this)
		});

	}

	componentWillUnmount() {
		APP.songs_storage.unregisterCallbacks('favorites');
	}

	updatePlaylist() {

		this.setState({
			favoritesList: this.favoritesList
		});

	}

	render() {

		return (
			<SongsList songs-list={this.state.favoritesList} type="favorites" />
		);

	}

}

export default Favorites;