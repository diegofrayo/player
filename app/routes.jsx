// npm libs
import React from 'react';
import {
	browserHistory,
	IndexRoute,
	Route,
	Router
} from 'react-router';

// react components
import AppView from 'containers/App';
import FavoritesView from 'containers/Favorites';
import PlaylistView from 'containers/Playlist';
import SearchView from 'containers/Search';

// js utils
import routerUrls from 'utils/routerUrls';

export default function createRoutes() {
	return (
		<Router history={browserHistory}>
			<Route path={routerUrls.HOME} component={AppView}>
				<IndexRoute component={PlaylistView} />
				<Route path={routerUrls.FAVORITES} component={FavoritesView} />
				<Route path={routerUrls.PLAYLIST} component={PlaylistView} />
				<Route path={routerUrls.SEARCH} component={SearchView} />
			</Route>
		</Router>
	);
}