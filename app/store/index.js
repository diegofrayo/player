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
		status: 'SUCCESS'
	}
};

const reduxApp = combineReducers({
	favorites,
	playlist,
	searches
});

const store = createStore(reduxApp, initialState);

export default store;