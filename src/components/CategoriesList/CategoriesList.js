import React from 'react';
import CategoriesListItem from 'components/CategoriesListItem/CategoriesListItem';
import classes from './CategoriesList.module.scss';

const CategoriesList = ({ list }) => {
  return (
    <ul className={classes.CategoriesList}>
      {list.map((item) => (
        <li key={item.id}>
          <CategoriesListItem item={item} />
        </li>
      ))}
    </ul>
  );
};

export default CategoriesList;
