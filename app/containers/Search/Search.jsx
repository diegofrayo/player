// npm libs
import classnames from 'classnames';
import React from 'react';

// react components
import SearchSong from 'components/SearchSong/SearchSong.jsx';
import SongsListInfo from 'components/SongsListInfo/SongsListInfo.jsx';
import Spinner from 'components/Spinner/Spinner.jsx';

// js utils
import Utilities from 'utils/utilities/Utilities';

// redux
import store from 'store/index';
import {
	searchSongsFetching as searchSongsFetchingAction
} from 'actions/search';

// styles
import styles from './Search.less';

class Searches extends React.Component {

	constructor(props) {
		super(props);
		this.search = this.search.bind(this);
		this.state = store.getState().searches;
		this.unsubscribe = store.subscribe(this.handleSubscribeChanges.bind(this));
	}

	componentDidMount() {
		Utilities.updatePageTitle('search');
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	handleSubscribeChanges() {
		this.setState(store.getState().searches);
	}

	search(event) {

		const inputText = this.input.value;

		if (event.key === 'Enter' && inputText.length > 2 && this.state.status !== 'FETCHING') {
			store.dispatch(searchSongsFetchingAction(inputText));
		}
	}

	renderSongs(songs) {

		let songsOutput;

		if (songs.length === 0) {
			songsOutput = null;
		} else {
			songsOutput = songs.map(song => <SearchSong song={song} key={song.source_id} />);
		}

		return (
			<div>
				<SongsListInfo>
					{songs.length} results for <strong>{this.state.query}</strong>
				</SongsListInfo>
				<div>
					{songsOutput}
				</div>
			</div>
		);
	}

	render() {

		return (
			<div>
				<div style={{ marginBottom: '15px' }}>
					<input type="text" placeholder="Search songs, artists, albums..." className={classnames('form-control')} onKeyPress={this.search} ref={(input) => { this.input = input; }} defaultValue={this.state.query} autoFocus />
				</div>
				{
					this.state.status === 'SUCCESS' && this.renderSongs(this.state.songs)
				}
				{
					this.state.status === 'FETCHING' &&	<Spinner />
				}
				{
					this.state.status === 'FAILURE' &&
					<p className={classnames(styles.error)}>
						{this.state.errorMessage}
					</p>
				}
			</div>
		);

	}

}

export default Searches;