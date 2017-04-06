// npm libs
import React from 'react';
import {
	Provider
} from 'react-redux';
import {
	AppContainer
} from 'react-hot-loader';

// react components
import App from 'routes.jsx';

// redux
import store from 'store/index';

const RootContainer = ({
	environment
}) => {

	console.log(environment);

	if (environment === 'development') {
		return (
			<AppContainer>
				<Provider store={store}>
					<App />
				</Provider>
			</AppContainer>
		);
	}

	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
};

RootContainer.propTypes = {
	environment: React.PropTypes.string.isRequired
};

export default RootContainer;