// npm libs
import {
	fork
} from 'redux-saga/effects';

// sagas
import search from 'sagas/search';

export default function* root() {
	yield fork(search);
}