import {
	combineReducers,
	createStore
} from 'redux';

import favorites from 'reducers/favorites';
import playlist from 'reducers/playlist';
import searches from 'reducers/searches';

const initialState = {
	favorites: {
		errorMessage: '',
		songs: [],
		status: 'FETCHING'
	},
	playlist: {
		errorMessage: '',
		songs: [],
		status: 'FETCHING'
	},
	searches: {
		errorMessage: '',
		songs: [],
		status: 'BLANK'
	}
};

const reduxApp = combineReducers({
	favorites,
	playlist,
	searches
});

/* eslint no-underscore-dangle: "off" */
const store = createStore(reduxApp, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;