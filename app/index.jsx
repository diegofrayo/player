// npm libs
import React from 'react';
import {
	render
} from 'react-dom';

// react components
import RootContainer from 'containers/Root/Root';

// styles
import 'styles/base.less';

const target = document.getElementById('parent-container');
const environment = APP_SETTINGS.environment;

render(<RootContainer environment={environment} />, target);

if (module.hot) {
	module.hot.accept('./containers/Root/Root.jsx', () => {
		const NextRootContainer = require('./containers/Root/Root.jsx').default;
		render(<NextRootContainer environment={environment} />, target);
	});
}