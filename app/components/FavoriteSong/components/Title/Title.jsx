// npm libs
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// styles
import styles from './Title.less';

const Title = ({
	children,
	onClickTitle,
	showInput,
	title
}) => (
	<div>
		<p className={classnames('u-cut-text', styles.title, { 'u-hide': showInput === true })} title={title} onClick={onClickTitle}>
			{title}
		</p>
		{children}
	</div>
);

Title.propTypes = {
	children: PropTypes.element.isRequired,
	onClickTitle: PropTypes.func.isRequired,
	showInput: PropTypes.bool,
	title: PropTypes.string.isRequired
};

Title.defaultProps = {
	showInput: false
};

export default Title;