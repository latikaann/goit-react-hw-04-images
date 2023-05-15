import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className={css.Button} type="button">
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = { onClick: PropTypes.func.isRequired };
