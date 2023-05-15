import React from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <input
          className={css.SearchFormInput}
          type="text"
          name="serchQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />

        <button type="submit" className={css.SearchFormBtn}>
          <span className={css.SearchFormBtnLabel}>Search</span>
        </button>
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
