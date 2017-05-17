// npm libs
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// styles
import styles from './SongsListInfo.less';

const SongsListInfo = ({
	children
}) => (
	<p className={classnames(styles.songsListInfo)}>
		<i className={classnames('material-icons', styles.infoIcon)}>&#xE88E;</i>
		<span>
			{children}
		</span>
	</p>
);

SongsListInfo.propTypes = {
	children: PropTypes.array.isRequired,
};

SongsListInfo.defaultProps = {
	children: ''
};

export default SongsListInfo;