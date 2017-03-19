// npm libs
import React from 'react';
import {
	connect
} from 'react-redux';

// js utils
import Utilities from 'utils/utilities/Utilities';

// react components
import PlaylistSong from 'components/PlaylistSong/PlaylistSong.jsx';
import Spinner from 'components/Spinner/Spinner.jsx';

// styles
import styles from './Playlist.less';

class Playlist extends React.Component {

	componentDidMount() {
		Utilities.updatePageTitle('playlist');
	}

	componentWillUnmount() {}

	render() {

		if (this.props.playlistReducer.status === 'SUCCESS') {

			const songs = this.props.playlistReducer.songs;

			if (songs.length <= 1) {
				return (
					<div className={styles.noSongsFound}>
						There are not songs in queue
					</div>
				);
			}

			const songsOutput = songs.map((song, index) => {
				if (index > 1) {
					return <PlaylistSong song={song} key={song.source_id} />;
				}
			});

			return (
				<div>
					<div className={styles.nextSongContainer}>
						<p className={styles.playlistInfoTitle}>
							Next to play
						</p>
						<PlaylistSong song={songs[1]} key={songs[1].source_id} />
					</div>
					<div className={styles.queueSongsContainer} style={songs.length > 2 ? { display: 'block' } : { display: 'none' }}>
						<p className={styles.playlistInfoTitle}>
							Queue
						</p>
						<div className={styles.songsOutputContainer} style={{ boxShadow: 'none' }}>
							{songsOutput}
						</div>
					</div>
				</div>
			);

		}

		return (
			<div>
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