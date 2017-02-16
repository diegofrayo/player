import {
	createStore
} from 'redux';

import reduxApp from 'reducers/index';

const initialState = {
	favorites: [],
	playlist: [],
	searchResults: []
};

const store = createStore(reduxApp, initialState);

export default store;