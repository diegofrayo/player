import HttpFactory from 'utils/components/http/HttpFactory';
import PromiseFactory from 'utils/components/promise/PromiseFactory';
import SearcherFactory from 'utils/components/searcher/SearcherFactory';
import SongsStorageFactory from 'utils/components/songs-storage/SongsStorageFactory';

const APP = {
	promise: new PromiseFactory().createInstance('PromiseImplementation', {}),
	songs_storage: new SongsStorageFactory().createInstance('FirebaseImplementationClass', {}),
	environment: '@@environment',
	username: 'diegofrayo'
};

if (APP.environment === 'dev') {
	APP.http = new HttpFactory().createInstance('HttpFetchImplementation', {});
	APP.searcher = new SearcherFactory().createInstance('LocalSearcher', {});
} else {
	APP.http = new HttpFactory().createInstance('HttpJQueryImplementation', {});
	APP.searcher = new SearcherFactory().createInstance('YoutubeSearcher', {
		api_key: '@@youtube_api_key'
	});
}

export default APP;