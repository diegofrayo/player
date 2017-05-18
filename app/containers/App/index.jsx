// npm libs
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// react components
import Header from 'components/Header';
import MainMenu from 'components/MainMenu';
import Player from 'components/Player';

// styles
import styles from './App.less';

const App = ({
	children
}) => (
	<div className={classnames('u-box-shadow', styles.parentContainer)}>
		<div className={classnames(styles.parentContainerChild)}>
			<MainMenu />
			<Header />
			<div className={classnames(styles.content)} id="content-wrapper">
				{children}
			</div>
			<Player />
		</div>
	</div>
);

App.propTypes = {
	children: PropTypes.element.isRequired
};

export default App;