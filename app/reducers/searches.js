import {
	SEARCH_SONGS_FAILURE,
	SEARCH_SONGS_FETCHING,
	SEARCH_SONGS_SUCCESS
} from 'constants/index';

export default function searches(state = {}, action = {}) {

	switch (action.type) {

		case SEARCH_SONGS_FAILURE:
			return Object.assign({}, state, {
				errorMessage: action.errorMessage,
				songs: [],
				status: 'FAILURE'
			});

		case SEARCH_SONGS_FETCHING:
			return Object.assign({}, state, {
				errorMessage: '',
				songs: [],
				status: 'FETCHING'
			});

		case SEARCH_SONGS_SUCCESS:
			return Object.assign({}, state, {
				errorMessage: '',
				songs: action.songs,
				status: 'SUCCESS'
			});

		default:
			return state;

	}

}