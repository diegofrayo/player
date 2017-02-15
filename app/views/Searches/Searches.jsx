import React from 'react';
import ReactDOM from 'react-dom';

import APP from 'utils/app';
import SongsList from 'components/SongsList/SongsList.jsx';
import Utilities from 'utils/utilities/Utilities';

import searchesStyles from './Searches.less';

class Searches extends React.Component {

	constructor(props) {
		super(props);
		this.search = this.search.bind(this);
	}

	componentDidMount() {
		Utilities.updatePageTitle('search');
	}

	search(event) {

		const inputText = this.input.value;

		if (event.key === 'Enter' && inputText.length > 2) {

			APP.searcher.searchSongs(inputText).then((response) => {

				ReactDOM.render(<SongsList type="search" songsList={response.data.songs.items} errorMessage={response.type === 'error' ? response.message : ''} />, this.searchesResultsWrapper);

			});

		}

	}

	render() {

		return (
			<div>
				<div className={searchesStyles.inputContainer}>
					<div className="form-group">
						<input type="text" placeholder="Search songs, artists, albums..." className={`form-control ${searchesStyles.inputSearch}`} onKeyPress={this.search} ref={(input) => { this.input = input; }} autoFocus />
					</div>
				</div>
				<div id="search-results-react-wrapper" ref={(container) => { this.searchesResultsWrapper = container; }}>{''}</div>
			</div>
		);

	}

}

export default Searches;