import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Creators as TriviaCreators } from 'store/ducks/trivia';
import QuizCloseBtn from 'components/QuizCloseBtn/QuizCloseBtn';
import Quiz from 'components/Quiz/Quiz';
import QuizPlaceholder from 'components/QuizPlaceholder/QuizPlaceholder';
import classes from './QuizPage.module.scss';

const QuizPage = ({ category }) => {
  const dispatch = useDispatch();
  const quiz = useSelector((state) => state.trivia.quiz);
  const [categoryQuiz, setCategoryQuiz] = useState(null);

  const fetchQuestions = useCallback(() => {
    dispatch(
      TriviaCreators.questionsRequestStart({
        id: quiz[category.slug].id,
        slug: quiz[category.slug].slug,
        level: quiz[category.slug].level,
      })
    );
  }, [dispatch, quiz, category]);

  useEffect(() => {
    if (quiz[category.slug]) {
      setCategoryQuiz(quiz[category.slug]);
      if (
        !quiz[category.slug].status.loading &&
        !quiz[category.slug].status.error &&
        !quiz[category.slug].questions[quiz[category.slug].level].loaded
      ) {
        dispatch(
          TriviaCreators.questionsRequestStart({
            id: quiz[category.slug].id,
            slug: quiz[category.slug].slug,
            level: quiz[category.slug].level,
          })
        );
      }
    } else {
      dispatch(TriviaCreators.quizCategoryBootstrap(category));
    }
  }, [dispatch, quiz, category, setCategoryQuiz]);

  return (
    <div className={classes.QuizPage}>
      <h2>{category.name}</h2>
      {categoryQuiz ? (
        <div className={classes.quiz}>
          {categoryQuiz.status.loading ? <QuizPlaceholder /> : null}
          {categoryQuiz.status.error ? (
            <div>
              Ocorreu um erro inesperado
              <button onClick={fetchQuestions}>Tentar Novamente</button>
            </div>
          ) : null}

          {!categoryQuiz.status.loading && categoryQuiz.currentQuestion ? (
            <Quiz question={categoryQuiz.currentQuestion} categorySlug={categoryQuiz.slug} />
          ) : null}

          {!categoryQuiz.status.loading &&
          !categoryQuiz.status.error &&
          !categoryQuiz.hasQuestions ? (
            <div>Categoria não possui questões suficientes dentro do Trivia DB</div>
          ) : null}
        </div>
      ) : null}
      <QuizCloseBtn className={classes.quizCloseBtn} />
    </div>
  );
};

export default QuizPage;
