// npm libs
import React from 'react';
import {
	browserHistory,
	IndexRoute,
	Route,
	Router
} from 'react-router';

// react components
import AppView from 'views/App/App.jsx';
import FavoritesView from 'views/Favorites/Favorites.jsx';
import PlaylistView from 'views/Playlist/Playlist.jsx';
import SearchesView from 'views/Searches/Searches.jsx';

export default function createRoutes() {
	return (
		<Router history={browserHistory}>
			<Route path="/player" component={AppView}>
				<IndexRoute component={PlaylistView} />
				<Route path="/player/favorites" component={FavoritesView} />
				<Route path="/player/playlist" component={PlaylistView} />
				<Route path="/player/search" component={SearchesView} />
			</Route>
		</Router>
	);
}