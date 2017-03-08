// js utils
import HttpFactory from 'utils/components/http/HttpFactory';
import PlayerFactory from 'utils/components/player/PlayerFactory';
import PromiseFactory from 'utils/components/promise/PromiseFactory';
import SearcherFactory from 'utils/components/searcher/SearcherFactory';
import SongsStorageFactory from 'utils/components/songs-storage/SongsStorageFactory';
import Utilities from 'utils/utilities/Utilities.js';

const environment = '@@environment';

const APP = {
	environment,
	http: new HttpFactory().createInstance('HttpJQueryImplementation', {}),
	player: new PlayerFactory().createInstance('JWPlayerImplementation'),
	promise: new PromiseFactory().createInstance('PromiseImplementation', {}),
	searcher: new SearcherFactory().createInstance('YoutubeSearcher', {
		api_key: '@@youtube_api_key'
	}),
	songs_storage: new SongsStorageFactory().createInstance('FirebaseImplementationClass', {}),
	username: Utilities.isGuestUser(environment) === true ? 'guest' : 'diegofrayo'
};

if (APP.environment === 'DEV') {
	// APP.http = new HttpFactory().createInstance('HttpFetchImplementation', {});
	// APP.searcher = new SearcherFactory().createInstance('LocalSearcher', {});
}

export default APP;