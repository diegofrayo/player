// npm libs
import {
	takeEvery
} from 'redux-saga';
import {
	call,
	fork,
	put
} from 'redux-saga/effects';

// js utils
import APP from 'utils/app';

// redux
import {
	SEARCH_SONGS_FETCHING
} from 'constants/index';
import {
	searchSongsFailure as searchSongsFailureAction,
	searchSongsSuccess as searchSongsSuccessAction
} from 'actions/search';


// sagas
export function* searchSaga(action) {

	try {

		const searchResponse = yield call(APP.searcher.searchSongs.bind(APP.searcher), action.query);

		if (searchResponse.type === 'Success') {
			yield put(searchSongsSuccessAction(searchResponse.data.songs.toArray()));
		} else {
			yield put(searchSongsFailureAction(searchResponse.message));
		}

	} catch (err) {
		console.log(err);
		yield put(searchSongsFailureAction('Error'));
	}
}


// watchers
function* watchSearch() {
	yield * takeEvery(SEARCH_SONGS_FETCHING, searchSaga);
}


// forks
export default function* search() {
	yield fork(watchSearch);
}