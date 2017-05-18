/* eslint global-require: "off" */

// npm libs
import React from 'react';
import {
	render
} from 'react-dom';

// styles
import 'styles/base.less';
import 'styles/util.less';

// react components
import RootContainer from 'containers/Root';

const target = document.getElementById('parent-container');
const environment = APP_SETTINGS.environment;

render(<RootContainer environment={environment} />, target);

if (module.hot) {
	module.hot.accept('./containers/Root/index.jsx', () => {
		const NextRootContainer = require('./containers/Root/index.jsx').default;
		render(<NextRootContainer environment={environment} />, target);
	});
}