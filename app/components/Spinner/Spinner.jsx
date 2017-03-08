// npm libs
import React from 'react';

// styles
import styles from './Spinner.less';

const Spinner = () => (
	<div className={styles.container}>
		<div className={styles.containerInner}>
			<img src="/assets/images/spinner.svg" alt="spinner" />
		</div>
	</div>
);

export default Spinner;