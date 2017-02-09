import APP from 'utils/app';
import SongsList from 'components/SongsList/SongsList.jsx';
import Utilities from 'utils/utilities/Utilities';

import searchesStyles from './Searches.css';

class Searches extends React.Component {

	constructor() {

		super();

		this.search = this.search.bind(this);
		this.inputTextBinding = this.inputTextBinding.bind(this);

		this.state = {
			inputText: ''
		};

	}

	componentDidMount() {
		Utilities.updatePageTitle('search');
	}

	inputTextBinding(event) {

		this.setState({
			inputText: event.target.value
		});

	}

	search(event) {

		const {
			inputText
		} = this.state;

		if (event.key === 'Enter' && inputText.length > 2) {

			APP.searcher.searchSongs(inputText).then((response) => {

				ReactDOM.render(<SongsList type="search" songsList={response.data.songs.items} errorMessage={response.type === 'error' ? response.message : ''} />, document.getElementById('search-results-react-wrapper'));

			});

		}

	}

	render() {

		return (
			<div>
				<div className={searchesStyles.inputContainer}>
					<div className="form-group">
						<input type="text" placeholder="Search songs..." className={`form-control ${searchesStyles.inputSearch}`} onChange={this.inputTextBinding} onKeyPress={this.search} value={this.state.inputText} autoFocus />
					</div>
				</div>
				<div id="search-results-react-wrapper">
					{''}
				</div>
			</div>
		);

	}

}

export default Searches;