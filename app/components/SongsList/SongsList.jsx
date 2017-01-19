// import React from 'react';

import FavoriteSong from 'components/FavoriteSong/FavoriteSong.jsx';
import PlaylistSong from 'components/PlaylistSong/PlaylistSong.jsx';
import SearchSong from 'components/SearchSong/SearchSong.jsx';

class SongsList extends React.Component {

	render() {

		const typeList = this.props.type;
		const songs = this.props['songs-list'];

		if (this.props['error-message']) {

			if (typeList === 'search') {

				return (
					<div className="search-results-wrapper col-xs-12">
						<p className="search-results-info">
							{this.props['error-message']}
						</p>
					</div>
				);

			}

		} else {

			let songsOutput;

			if (typeList === 'playlist') {

				songsOutput = songs.map(song => <PlaylistSong song={song} key={song.source_id} />);

				return (
					<div className="songs-list-wrapper playlist-wrapper col-xs-12">
						{songsOutput}
					</div>
				);

			} else if (typeList === 'favorites') {

				songsOutput = songs.map(song => <FavoriteSong song={song} key={song.source_id} />);

				return (
					<div className="songs-list-wrapper favorites-wrapper col-xs-12">
						<p className="favorites-info songs-list-info">
							Número de favoritos: {songs.length}
						</p>
						{songsOutput}
					</div>
				);

			} else if (typeList === 'search') {

				songsOutput = songs.map(song => <SearchSong song={song} key={song.source_id} />);

				return (
					<div className="songs-list-wrapper search-results-wrapper col-xs-12">
						<p className="search-results-info songs-list-info">
							Número de resultados: {songs.length}
						</p>
						{songsOutput}
					</div>
				);

			}

		}

		return null;

	}

}

export default SongsList;