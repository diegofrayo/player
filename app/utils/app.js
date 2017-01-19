import HttpFactory from 'utils/components/http/HttpFactory';
import PromiseFactory from 'utils/components/promise/PromiseFactory';
import SearcherFactory from 'utils/components/searcher/SearcherFactory';
import SongsStorageFactory from 'utils/components/songs-storage/SongsStorageFactory';

const APP = {
	promise: new PromiseFactory().createInstance('PromiseImplementation', {}),
	songs_storage: new SongsStorageFactory().createInstance('FirebaseImplementationClass', {})
};

// APP.searcher = new SearcherFactory().createInstance('LocalSearcher', {});
APP.searcher = new SearcherFactory().createInstance('YoutubeSearcher', {
	api_key: '@@youtube_api_key'
});

// APP.http = new HttpFactory().createInstance('HttpFetchImplementation', {});
APP.http = new HttpFactory().createInstance('HttpJQueryImplementation', {});

APP.username = 'diegofrayo';

export default APP;