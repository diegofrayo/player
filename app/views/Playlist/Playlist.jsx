import React from 'react';

import APP from 'utils/app.js';
import SongsList from 'components/SongsList/SongsList.jsx';
import Utilities from 'utils/utilities/Utilities';

class Playlist extends React.Component {

	constructor() {

		super();

		this.state = {
			playlist: APP.songs_storage.getPlaylist()
		};

		this.updatePlaylist = this.updatePlaylist.bind(this);

	}

	componentDidMount() {

		Utilities.updatePageTitle('playlist');

		APP.songs_storage.registerCallback('playlist', 'playlist', 'child_added', this.updatePlaylist);
		APP.songs_storage.registerCallback('playlist', 'playlist', 'child_changed', this.updatePlaylist);
		APP.songs_storage.registerCallback('playlist', 'playlist', 'child_removed', this.updatePlaylist);

	}

	componentWillUnmount() {
		APP.songs_storage.unregisterCallbacks('playlist');
	}

	updatePlaylist() {

		this.setState({
			playlist: APP.songs_storage.getPlaylist()
		});

	}

	render() {

		return (
			<SongsList songsList={this.state.playlist} type="playlist" />
		);

	}

}

export default Playlist;