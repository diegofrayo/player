import HttpFactory from 'utils/components/http/HttpFactory';
import PromiseFactory from 'utils/components/promise/PromiseFactory';
import PlayerFactory from 'utils/components/player/PlayerFactory';
import SearcherFactory from 'utils/components/searcher/SearcherFactory';
import SongsStorageFactory from 'utils/components/songs-storage/SongsStorageFactory';

const APP = {
	environment: '@@environment',
	http: new HttpFactory().createInstance('HttpJQueryImplementation', {}),
	player: new PlayerFactory().createInstance('JWPlayerImplementation'),
	promise: new PromiseFactory().createInstance('PromiseImplementation', {}),
	searcher: new SearcherFactory().createInstance('YoutubeSearcher', {
		api_key: '@@youtube_api_key'
	}),
	songs_storage: new SongsStorageFactory().createInstance('FirebaseImplementationClass', {}),
	username: 'diegofrayo'
};

if (APP.environment === 'DEV') {
	// APP.http = new HttpFactory().createInstance('HttpFetchImplementation', {});
	// APP.searcher = new SearcherFactory().createInstance('LocalSearcher', {});
}

export default APP;