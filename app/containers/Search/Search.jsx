// npm libs
import React from 'react';

// react components
import SongsList from 'components/SongsList/SongsList.jsx';
import Spinner from 'components/Spinner/Spinner.jsx';

// js utils
import Utilities from 'utils/utilities/Utilities';

// redux
import store from 'store/index';
import {
	searchSongsFetching
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
			store.dispatch(searchSongsFetching(inputText));
		}
	}

	render() {

		return (
			<div>
				<div className={styles.inputContainer}>
					<div className="form-group">
						<input type="text" placeholder="Search songs, artists, albums..." className={`form-control`} onKeyPress={this.search} ref={(input) => { this.input = input; }} defaultValue={this.state.query} autoFocus />
					</div>
				</div>
				{
					this.state.status === 'SUCCESS' &&
					(
						<SongsList type="search" songsList={this.state.songs}>
							{this.state.songs.length} results for <strong>{this.state.query}</strong>
						</SongsList>
					)
				}
				{
					this.state.status === 'FETCHING' &&
					<Spinner />
				}
				{
					this.state.status === 'FAILURE' &&
					<p className={styles.error}>
						{this.state.errorMessage}
					</p>
				}
			</div>
		);

	}

}

export default Searches;