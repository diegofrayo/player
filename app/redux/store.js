import {
	createStore
} from 'redux';

import reduxApp from 'redux/reducers';

const initialState = {
	favorites: [],
	playlist: [],
	search_results: []
};

const store = createStore(reduxApp, initialState);

export default store;