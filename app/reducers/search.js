/* eslint indent: "off" */

// npm libs
import update from 'immutability-helper';

// redux
import {
	SEARCH_SONGS_FAILURE,
	SEARCH_SONGS_FETCHING,
	SEARCH_SONGS_SUCCESS
} from 'constants/index';

export default function searches(state = {}, action = {}) {

	switch (action.type) {

		case SEARCH_SONGS_FETCHING:
			return update(state, {
				errorMessage: {
					$set: '',
				},
				query: {
					$set: action.query
				},
				songs: {
					$set: []
				},
				status: {
					$set: 'FETCHING',
				}
			});

		case SEARCH_SONGS_FAILURE:
			return update(state, {
				errorMessage: {
					$set: action.errorMessage,
				},
				songs: {
					$set: []
				},
				status: {
					$set: 'FAILURE',
				}
			});

		case SEARCH_SONGS_SUCCESS:
			return update(state, {
				errorMessage: {
					$set: '',
				},
				songs: {
					$set: action.songs
				},
				status: {
					$set: 'SUCCESS',
				}
			});

		default:
			return state;

	}

}