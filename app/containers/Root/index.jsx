// npm libs
import PropTypes from 'prop-types';
import React from 'react';
import {
	Provider
} from 'react-redux';
import {
	AppContainer
} from 'react-hot-loader';

// react components
import App from 'routes';

// redux
import store from 'store';

const RootContainer = ({
	environment
}) => {

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
	environment: PropTypes.string.isRequired
};

export default RootContainer;