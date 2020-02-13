import React from 'react';
import PropTypes from 'prop-types';
import styles from './Controls.css';

const Controls = ({ children }) => (
  <section className={styles.Controls}>
    {children}
  </section>
);

Controls.propTypes = {
  children: PropTypes.node
};

export default Controls;
