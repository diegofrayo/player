// npm libs
import React from 'react';

// react components
import FavoriteSong from 'components/FavoriteSong/FavoriteSong.jsx';
import PlaylistSong from 'components/PlaylistSong/PlaylistSong.jsx';
import SearchSong from 'components/SearchSong/SearchSong.jsx';

// styles
import playlistStyles from 'views/Playlist/Playlist.less';
import styles from './SongsList.less';

class SongsList extends React.Component {

	render() {

		const typeList = this.props.type;
		const songs = this.props.songsList;

		let songsOutput;

		if (typeList === 'playlist') {

			if (songs.length <= 1) {

				return (
					<div className={playlistStyles.noSongsFound}>
						There are not songs in queue
					</div>
				);

			}

			songsOutput = songs.map((song, index) => {

				if (index > 1) {
					return <PlaylistSong song={song} key={song.source_id} />;
				}

				return '';
			});

			return (
				<div>
					<div className={playlistStyles.nextSongContainer}>
						<p className={playlistStyles.playlistInfoTitle}>
							Next to play
						</p>
						<PlaylistSong song={songs[1]} key={songs[1].source_id} />
					</div>
					<div className={playlistStyles.queueSongsContainer} style={songsOutput.length > 2 ? { display: 'block' } : { display: 'none' }}>
						<p className={playlistStyles.playlistInfoTitle}>
							Queue
						</p>
						<div className={styles.songsOutputContainer} style={{ boxShadow: 'none' }}>
							{songsOutput}
						</div>
					</div>
				</div>
			);

		} else if (typeList === 'favorites') {

			songsOutput = songs.map(song => <FavoriteSong song={song} key={song.source_id} />);

			return (
				<div>
					<p className={styles.songsListInfo}>
						<i className={`material-icons ${styles.infoIcon}`}>info</i>
						<span>
							Total number of songs: {songs.length}
						</span>
					</p>
					<div className={styles.songsOutputContainer}>
						{songsOutput}
					</div>
				</div>
			);

		} else if (typeList === 'search') {

			songsOutput = songs.map(song => <SearchSong song={song} key={song.source_id} />);

			return (
				<div>
					<p className={styles.songsListInfo}>
						<i className={`material-icons ${styles.infoIcon}`}>info</i>
						<span>
							Results: {songs.length}
						</span>
					</p>
					<div className={styles.songsOutputContainer}>
						{songsOutput}
					</div>
				</div>
			);

		}

		return null;

	}

}

SongsList.propTypes = {
	songsList: React.PropTypes.array.isRequired,
	type: React.PropTypes.string.isRequired
};

export default SongsList;