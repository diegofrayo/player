// js utils
import HttpFactory from 'utils/components/http/HttpFactory';
import PlayerFactory from 'utils/components/player/PlayerFactory';
import PromiseFactory from 'utils/components/promise/PromiseFactory';
import SearcherFactory from 'utils/components/searcher/SearcherFactory';
import SongsStorageFactory from 'utils/components/songs-storage/SongsStorageFactory';
import Utilities from 'utils/utilities/Utilities.js';

const environment = APP_SETTINGS.environment;

const APP = {
	environment,
	http: new HttpFactory().createInstance('HttpFetchImplementation', {}),
	player: new PlayerFactory().createInstance('JWPlayerImplementation'),
	promise: new PromiseFactory().createInstance('PromiseImplementation', {}),
	searcher: new SearcherFactory().createInstance('YoutubeSearcher', {
		api_key: APP_SETTINGS.youtube_api_key
	}),
	songs_storage: new SongsStorageFactory().createInstance('FirebaseImplementationClass', {}),
	username: Utilities.isGuestUser(environment) === true ? 'guest' : 'diegofrayo'
};

if (APP.environment === 'development') {
	// APP.http = new HttpFactory().createInstance('HttpFetchImplementation', {});
	// APP.searcher = new SearcherFactory().createInstance('LocalSearcher', {});
}

if (APP.username === 'guest' && APP.environment === 'production') {
	/* eslint-disable */
	(function(i, s, o, g, r, a, m) {
		i['GoogleAnalyticsObject'] = r;
		i[r] = i[r] || function() {
			(i[r].q = i[r].q || []).push(arguments)
		}, i[r].l = 1 * new Date();
		a = s.createElement(o),
			m = s.getElementsByTagName(o)[0];
		a.async = 1;
		a.src = g;
		m.parentNode.insertBefore(a, m)
	})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
	ga('create', 'UA-90015747-1', 'auto', 'playerApp');
	ga('playerApp.send', 'pageview');
	/* eslint-enable */
}

export default APP;