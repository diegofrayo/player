// npm libs
import React from 'react';
import {
	browserHistory,
	IndexRoute,
	Route,
	Router
} from 'react-router';

// react components
import AppView from 'containers/App/App.jsx';
import FavoritesView from 'containers/Favorites/Favorites.jsx';
import PlaylistView from 'containers/Playlist/Playlist.jsx';
import SearchView from 'containers/Search/Search.jsx';

// js utils
import routerUrls from 'utils/routerUrls';

export default function createRoutes() {
	return (
		<Router history={browserHistory}>
			<Route path={routerUrls.ROOT} component={AppView}>
				<IndexRoute component={PlaylistView} />
				<Route path={routerUrls.FAVORITES()} component={FavoritesView} />
				<Route path={routerUrls.PLAYLIST()} component={PlaylistView} />
				<Route path={routerUrls.SEARCH()} component={SearchView} />
			</Route>
		</Router>
	);
}