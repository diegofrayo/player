import reduxApp from 'reducers/index';
import PlaylistView from 'views/Playlist/Playlist.jsx';

const mapStateToProps = (state) => {
	return {
		playlist: reduxApp.playlist()
	}
}

const PlaylistViewContainer = connect(
	mapStateToProps
)(PlaylistView);

export default PlaylistViewContainer;