// import ReactDOM from 'react-dom';

import {
	Router,
	Route,
	IndexRoute,
	hashHistory
} from 'react-router';

import App from 'views/App/App.jsx';
import Favorites from 'views/Favorites/Favorites.jsx';
import Playlist from 'views/Playlist/Playlist.jsx';
import Searches from 'views/Searches/Searches.jsx';

ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Playlist} />
			<Route path="playlist" component={Playlist} />
			<Route path="searches" component={Searches} />
			<Route path="favorites" component={Favorites} />
		</Route>
	</Router>
), document.getElementById('parent-container'));