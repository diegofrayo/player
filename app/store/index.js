import {
	combineReducers,
	createStore
} from 'redux';

import favorites from 'reducers/favorites';
import playlist from 'reducers/playlist';
import searches from 'reducers/searches';

const initialState = {
	favorites: [],
	playlist: [],
	searches: {
		errorMessage: '',
		songs: [],
		status: 'success'
	}
};

const reduxApp = combineReducers({
	favorites,
	playlist,
	searches
});

const store = createStore(reduxApp, initialState);

export default store;