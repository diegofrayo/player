// npm libs
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// js utils
import Utilities from 'utils/utilities/Utilities';

// react components
import SongTitle from 'components/Song/Title/Title.jsx';

// styles
import styles from './Body.less';

function updateChildClassName(child, index) {

	const customProps = {
		key: `${child.type}-${index}`
	};

	if (child.type === 'button') {
		customProps.className = classnames(styles.button, {
			[child.props.className]: child.props.className
		});
	}

	const props = Utilities.cloneObject({}, child.props, customProps);

	return React.cloneElement(child, props);
}

const Body = ({
	children,
	hideButtons,
	title,
	titleComponent
}) => (
	<div className={classnames(styles.wrapper)}>
		{titleComponent && titleComponent}
		{!titleComponent && <SongTitle title={title} />}
		<div className={classnames('u-text-center', styles.body, { 'u-display-block': hideButtons === false })}>
			{children.map((child, index) => updateChildClassName(child, index))}
		</div>
	</div>
);

Body.propTypes = {
	children: PropTypes.array.isRequired,
	hideButtons: PropTypes.bool,
	title: PropTypes.string.isRequired,
	titleComponent: PropTypes.element
};

Body.defaultProps = {
	hideButtons: false
};

export default Body;