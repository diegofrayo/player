// npm libs
import PropTypes from 'prop-types';
import React from 'react';

// styles
import styles from './Title.less';

const Title = ({
	title
}) => (
	<div>
		<p className={`${styles.title} u-cut-text`} title={title}>
			{title}
		</p>
	</div>
);

Title.propTypes = {
	title: PropTypes.string.isRequired
};

export default Title;