// npm libs
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// styles
import styles from './SongTitle.less';

const SongTitle = ({
	title
}) => (
	<div>
		<p className={classnames('u-cut-text', styles.title)} title={title}>
			{title}
		</p>
	</div>
);

SongTitle.propTypes = {
	title: PropTypes.string.isRequired
};

export default SongTitle;