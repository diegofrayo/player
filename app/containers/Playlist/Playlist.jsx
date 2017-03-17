// npm libs
import React from 'react';
import {
	connect
} from 'react-redux';

// js utils
import Utilities from 'utils/utilities/Utilities';

// react components
import SongsList from 'components/SongsList/SongsList.jsx';
import Spinner from 'components/Spinner/Spinner.jsx';

class Playlist extends React.Component {

	componentDidMount() {
		Utilities.updatePageTitle('playlist');
	}

	componentWillUnmount() {}

	render() {
		return (
			<div>
				{
					this.props.playlistReducer.status === 'SUCCESS' &&
					<SongsList songsList={this.props.playlistReducer.songs} type="playlist" />
				}
				{
					this.props.playlistReducer.status === 'FETCHING' &&
					<Spinner />
				}
				{
					this.props.playlistReducer.status === 'FAILURE' &&
					<div>
						{this.props.playlistReducer.errorMessage}
					</div>
				}
			</div>
		);
	}

}

const mapStateToProps = state => ({
	playlistReducer: state.playlist
});

Playlist.propTypes = {
	playlistReducer: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Playlist);