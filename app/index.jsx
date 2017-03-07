import React from 'react';
import ReactDOM from 'react-dom';
import {
	browserHistory,
	IndexRoute,
	Route,
	Router
} from 'react-router';

import 'styles/base.less';

import APP from 'utils/app.js';
import Utilities from 'utils/utilities/Utilities.js';

import AppView from 'views/App/App.jsx';
import FavoritesView from 'views/Favorites/Favorites.jsx';
import PlaylistView from 'views/Playlist/Playlist.jsx';
import SearchesView from 'views/Searches/Searches.jsx';

if (Utilities.isGuestUser(APP.environment) === true) {
	APP.username = 'guest';
} else {
	APP.username = 'diegofrayo';
}

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/player" component={AppView}>
			<IndexRoute component={PlaylistView} />
			<Route path="/player/favorites" component={FavoritesView} />
			<Route path="/player/playlist" component={PlaylistView} />
			<Route path="/player/search" component={SearchesView} />
		</Route>
	</Router>
), document.getElementById('parent-container'));