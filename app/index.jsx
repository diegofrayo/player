// npm librs
import React from 'react';
import {
	render
} from 'react-dom';
import {
	Provider
} from 'react-redux';

// styles
import 'styles/base.less';

// react components
import App from 'routes.jsx';

// redux
import store from 'store/index';

render((
	<Provider store={store}>
		<App />
	</Provider>
), document.getElementById('parent-container'));