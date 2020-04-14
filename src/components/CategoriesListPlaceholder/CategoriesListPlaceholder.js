import React from 'react';
import classes from './CategoriesListPlaceholder.module.scss';

const CategoriesListPlaceholder = () => {
  return (
    <ul className={classes.CategoriesListPlaceholder}>
      {[1, 2, 3, 4].map((item) => (
        <li key={item}>
          <div></div>
        </li>
      ))}
    </ul>
  );
};

export default CategoriesListPlaceholder;
