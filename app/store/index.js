// npm libs
import {
	combineReducers,
	createStore
} from 'redux';

// redux
import favorites from 'reducers/favorites';
import player from 'reducers/player';
import playlist from 'reducers/playlist';
import searches from 'reducers/search';

const initialState = {
	favorites: {
		errorMessage: '',
		songs: [],
		status: 'FETCHING'
	},
	player: {
		close: false,
		status: 'LOADING'
	},
	playlist: {
		errorMessage: '',
		songs: [],
		status: 'FETCHING'
	},
	searches: {
		errorMessage: '',
		query: '',
		songs: [],
		status: 'BLANK'
	}
};

const reduxApp = combineReducers({
	favorites,
	player,
	playlist,
	searches
});

const reduxDevTool = (window.__REDUX_DEVTOOLS_EXTENSION__ && APP_SETTINGS.environment === 'development') ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined;

/* eslint no-underscore-dangle: "off" */
const store = createStore(reduxApp, initialState, reduxDevTool);

export default store;