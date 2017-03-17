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

export default function createRoutes() {
	return (
		<Router history={browserHistory}>
			<Route path="/player" component={AppView}>
				<IndexRoute component={PlaylistView} />
				<Route path="/player/favorites" component={FavoritesView} />
				<Route path="/player/playlist" component={PlaylistView} />
				<Route path="/player/search" component={SearchView} />
			</Route>
		</Router>
	);
}