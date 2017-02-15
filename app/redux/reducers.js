import {
	combineReducers
} from 'redux';

import {
	ADD_SONG
} from 'redux/actions';

function favorites(state = [], action = {}) {

	switch (action.type) {

		case ADD_SONG:

			return Object.assign({}, state, {
				favorites: state.concat(action.song)
			});

		default:
			return state;

	}

}

function playlist(state = [], action = {}) {

	switch (action.type) {

		case ADD_SONG:

			return Object.assign({}, state, {
				playlist: state.concat(action.song)
			});

		default:
			return state;

	}

}

function searchResults(state = [], action = {}) {

	switch (action.type) {

		case ADD_SONG:

			return Object.assign({}, state, {
				searchResults: state.concat(action.song)
			});

		default:
			return state;

	}

}

const reduxApp = combineReducers({
	favorites,
	playlist,
	searchResults
});

export default reduxApp;