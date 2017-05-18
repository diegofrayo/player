// npm libs
import {
	applyMiddleware,
	combineReducers,
	compose,
	createStore
} from 'redux';
import createSagaMiddleware from 'redux-saga';

// redux
import favorites from 'reducers/favorites';
import player from 'reducers/player';
import playlist from 'reducers/playlist';
import searches from 'reducers/search';

// sagas
import mySagas from 'sagas';

const initialState = {
	favorites: {
		errorMessage: '',
		opened_groups: {
			current: '',
			previous: ''
		},
		songs: {
			number: 0,
			groups: {},
			source_ids: []
		},
		status: 'FETCHING'
	},
	player: {
		close: true,
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

const sagaMiddleware = createSagaMiddleware();

const reduxDevTool = (window.__REDUX_DEVTOOLS_EXTENSION__ && APP_SETTINGS.environment === 'development') ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined;

const createStoreWithMiddleware = compose(
	applyMiddleware(sagaMiddleware)
)(createStore);

/* eslint no-underscore-dangle: "off" */
const store = createStoreWithMiddleware(reduxApp, initialState, reduxDevTool);

sagaMiddleware.run(mySagas);

export default store;