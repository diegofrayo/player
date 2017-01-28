// import React from 'react';

import FavoriteSong from 'components/FavoriteSong/FavoriteSong.jsx';
import PlaylistSong from 'components/PlaylistSong/PlaylistSong.jsx';
import SearchSong from 'components/SearchSong/SearchSong.jsx';

import playlistStyles from 'views/Playlist/Playlist.css';
import styles from './SongsList.css';

class SongsList extends React.Component {

	render() {

		const typeList = this.props.type;
		const songs = this.props['songs-list'];

		if (this.props['error-message']) {

			if (typeList === 'search') {

				return (
					<div>
						<p className="search-results-info">
							{this.props['error-message']}
						</p>
					</div>
				);

			}

		} else {

			let songsOutput;

			if (typeList === 'playlist') {

				if (songs.length === 0) {

					return (
						<p className={styles.songsListInfo}>
							No hay canciones agregadas
						</p>
					);

				}

				songsOutput = songs.map((song, index) => {

					if (index !== 0) {
						return <PlaylistSong song={song} key={song.source_id} />;
					}

					return '';
				});

				return (
					<div>
						<div className={playlistStyles.nextSongContainer}>
							<p className={playlistStyles.playlistInfoTitle}>
								Siguiente en sonar
							</p>
							<PlaylistSong song={songs[0]} key={songs[0].source_id} />
						</div>
						<div className={playlistStyles.queueSongsContainer}>
							<p className={playlistStyles.playlistInfoTitle}>
								En cola
							</p>
							{songsOutput}
						</div>
					</div>
				);

			} else if (typeList === 'favorites') {

				songsOutput = songs.map(song => <FavoriteSong song={song} key={song.source_id} />);

				return (
					<div>
						<p className={styles.songsListInfo}>
							<i className="material-icons">info</i>
							<span>
								Número de canciones: {songs.length}
							</span>
						</p>
						{songsOutput}
					</div>
				);

			} else if (typeList === 'search') {

				songsOutput = songs.map(song => <SearchSong song={song} key={song.source_id} />);

				return (
					<div>
						<p className={styles.songsListInfo}>
							<i className="material-icons">info</i>
							<span>
								Número de resultados: {songs.length}
							</span>
						</p>
						{songsOutput}
					</div>
				);

			}

		}

		return null;

	}

}

SongsList.propTypes = {
	'error-message': React.PropTypes.string,
	'songs-list': React.PropTypes.array,
	type: React.PropTypes.string.isRequired
};

export default SongsList;