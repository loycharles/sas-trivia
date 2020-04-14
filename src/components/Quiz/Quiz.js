import React, { useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { Creators as TriviaCreators } from 'store/ducks/trivia';
import QuizModalFeedback from 'components/QuizModalFeedback/QuizModalFeedback';
import QuizQuestionLevel from 'components/QuizQuestionLevel/QuizQuestionLevel';
import Button from 'components/Button/Button';
import classes from './Quiz.module.scss';

const Quiz = ({ question, categorySlug }) => {
  const dispatch = useDispatch();
  const btnAsnwer = useRef();

  const answerQuestion = useCallback(() => {
    if (question.status.answered) return;

    dispatch(TriviaCreators.questionsAnswer());
  }, [dispatch, question]);

  return (
    <div className={classes.Quiz}>
      <h3>Questão {question.position}</h3>
      <QuizQuestionLevel level={question.level} className={classes.QuizQuestionLevel} />
      <p dangerouslySetInnerHTML={{ __html: question.utterance }} role="heading" aria-level="4" />
      <div aria-required="true" role="radiogroup">
        {question.options.map((option, opt) => {
          let option_selected = question.answer === option;
          return (
            <button
              key={opt}
              aria-label={option}
              role="radio"
              aria-checked={option_selected}
              aria-posinset={opt + 1}
              aria-setsize={question.options.length}
              className={clsx({
                [classes.QuizOption]: true,
                [classes.QuizOptionSelected]: option_selected,
              })}
              onClick={() => {
                if (question.status.answered) return;

                dispatch(TriviaCreators.questionsSelectOption(categorySlug, option));
                setTimeout(() => {
                  btnAsnwer.current.focus();
                }, 100);
              }}
              disabled={question.status.answered}
            >
              <span dangerouslySetInnerHTML={{ __html: option }} />
            </button>
          );
        })}
      </div>

      <div className={classes.ButtonContainer}>
        <Button
          className={classes.Button}
          disabled={!question.answer || question.status.answered}
          ref={btnAsnwer}
          onClick={answerQuestion}
        >
          Responder
        </Button>
      </div>

      {question.status.answered ? <QuizModalFeedback correct={question.status.correct} /> : null}
    </div>
  );
};

export default Quiz;
