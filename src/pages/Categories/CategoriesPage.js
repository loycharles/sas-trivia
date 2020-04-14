import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Creators as TriviaCreators } from 'store/ducks/trivia';
import CategoriesList from 'components/CategoriesList/CategoriesList';
import CategoriesListPlaceholder from 'components/CategoriesListPlaceholder/CategoriesListPlaceholder';
import classes from './CategoriesPage.module.scss';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { status, list } = useSelector((state) => state.trivia.categories);
  const request = useCallback(() => {
    if (!status.loading && !status.loaded) {
      dispatch(TriviaCreators.categoriesRequestStart());
    }
  }, [dispatch, status]);

  useEffect(() => {
    request();
  }, [request]);

  return (
    <div className={classes.CategoriesPage}>
      <h2>Categorias</h2>

      {status.loading && !status.loaded ? <CategoriesListPlaceholder /> : null}
      {!status.loading && status.loaded ? (
        <nav>
          <CategoriesList list={list} />
        </nav>
      ) : null}
      {status.error && !status.loaded ? status.error : null}
    </div>
  );
};

export default CategoriesPage;
