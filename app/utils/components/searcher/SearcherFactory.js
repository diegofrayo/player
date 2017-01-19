import YoutubeSearcher from 'utils/components/searcher/YoutubeSearcher';
import LocalSearcher from 'utils/components/searcher/LocalSearcher';

export default class SearcherFactory {

	createInstance(className, configuration) {

		if (className === 'YoutubeSearcher') {
			this.searcherInstance = new YoutubeSearcher(configuration);
		} else if (className === 'LocalSearcher') {
			this.searcherInstance = new LocalSearcher(configuration);
		}

		return this.searcherInstance;
	}

	getInstance() {
		return this.searcherInstance;
	}

}