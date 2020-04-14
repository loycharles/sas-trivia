import React from 'react';
import { NavLink } from 'react-router-dom';
import './CategoriesListItem.scss';

const CategoriesListItem = ({ item }) => {
  return (
    <NavLink exact to={`/quiz/${item.slug}`} className="CategoriesListItem">
      <span>{item.name}</span>
    </NavLink>
  );
};

export default CategoriesListItem;
