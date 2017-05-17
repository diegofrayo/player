// npm libs
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// styles
import styles from './ProgressBar.less';

const ProgressBar = ({
	onClick,
	progress
}) => (
	<div className={classnames(styles.playerProgressBarContainer)} onClick={onClick}>
		<div className={classnames(styles.playerProgressBarInner)}>
			<div className={classnames(styles.playerProgressBar)} style={{ width: `${progress}%` }}>
				{''}
			</div>
		</div>
	</div>
);

ProgressBar.propTypes = {
	onClick: PropTypes.func.isRequired,
	progress: PropTypes.number.isRequired
};

export default ProgressBar;