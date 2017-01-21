import APP from 'utils/app';
import SongsList from 'components/SongsList/SongsList.jsx';

class Playlist extends React.Component {

	constructor() {

		super();

		this.playlist = APP.songs_storage.getPlaylist();

		this.state = {
			playlist: this.playlist
		};

	}

	componentDidMount() {

		document.title = 'player | Playlist';
		document.getElementById('header-title').innerHTML = 'Playlist';

		APP.songs_storage.initPlaylistWatchers();

		APP.songs_storage.registerCallbacks('playlist', {
			child_added: this.updatePlaylist.bind(this),
			child_changed: this.updatePlaylist.bind(this),
			child_removed: this.updatePlaylist.bind(this)
		});

	}

	componentWillUnmount() {
		APP.songs_storage.unregisterCallbacks('playlist');
	}

	updatePlaylist() {

		this.setState({
			playlist: this.playlist
		});

	}

	render() {

		return (
			<SongsList songs-list={this.state.playlist} type="playlist" />
		);

	}

}

export default Playlist;