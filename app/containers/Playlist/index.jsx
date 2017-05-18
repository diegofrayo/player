// npm libs
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {
	connect
} from 'react-redux';

// js utils
import Utilities from 'utils/utilities/Utilities';

// react components
import PlaylistSong from 'components/PlaylistSong';
import Spinner from 'components/Spinner';

// styles
import styles from './Playlist.less';

class Playlist extends React.Component {

	componentDidMount() {
		Utilities.updatePageTitle('playlist');
	}

	render() {

		if (this.props.playlistReducer.status === 'SUCCESS') {

			const songs = this.props.playlistReducer.songs;

			if (songs.length <= 1) {
				return (
					<div className={classnames(styles.noSongsFound)}>
						<p>
							There are not songs in queue
						</p>
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
					<div className={classnames('u-box-shadow', styles.nextSongContainer)}>
						<p className={classnames(styles.playlistInfoTitle)}>
							Next to play
						</p>
						<PlaylistSong song={songs[1]} key={songs[1].source_id} />
					</div>
					<div className={classnames('u-box-shadow', styles.queueSongsContainer, { 'u-display-block': songs.length > 2 })}>
						<p className={classnames(styles.playlistInfoTitle)}>
							Queue
						</p>
						<div className={classnames(styles.songsOutputContainer)} style={{ boxShadow: 'none' }}>
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
	playlistReducer: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Playlist);