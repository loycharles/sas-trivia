import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Creators as TriviaCreators } from 'store/ducks/trivia';
import { useParams, Redirect } from 'react-router-dom';
import QuizPage from './QuizPage';

const QuizPageRouter = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.trivia.categories.list);
  const { slug } = useParams();
  const category = list.filter((item) => item.slug === slug)[0];

  useEffect(() => {
    if (category) {
      dispatch(TriviaCreators.quizSelectCategory(category));
    }
  }, [dispatch, category]);

  if (!category) return <Redirect to={{ pathname: '/' }} />;

  if (category && category.finished)
    return <Redirect to={{ pathname: `/quiz/${category.slug}/resultado` }} />;

  return <QuizPage category={category} />;
};

export default QuizPageRouter;
