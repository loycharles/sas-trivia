import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { Creators as TriviaCreators } from 'store/ducks/trivia';
import Button from 'components/Button/Button';
import { ReactComponent as AnswerCorrectIcon } from 'assets/imgs/answer-correct-icon.svg';
import { ReactComponent as AnswerWrongIcon } from 'assets/imgs/answer-wrong-icon.svg';
import { ReactComponent as ArrowRightIcon } from 'assets/imgs/arrow-right.svg';
import classes from './QuizModalFeedback.module.scss';

const QuizModalFeedback = ({ correct }) => {
  const dispatch = useDispatch();
  const btnForward = useRef();

  useEffect(() => {
    if (btnForward.current) {
      btnForward.current.focus();
    }
  }, [btnForward]);

  return (
    <div role="presentation" className={classes.QuizModalFeedback}>
      <div role="none presentation" className={classes.QuizModalFeedbackBackdrop}>
        <div
          className={clsx({
            [classes.QuizModalFeedbackContent]: true,
            [classes.Correct]: correct,
            [classes.Wrong]: !correct,
          })}
        >
          {correct ? (
            <AnswerCorrectIcon role="img" alt="Ícone resposta correta" />
          ) : (
            <AnswerWrongIcon role="img" alt="Ícone resposta errada" />
          )}

          <h3>Você {correct ? 'acertou' : 'errou'}!</h3>

          <Button
            icon={<ArrowRightIcon />}
            onClick={() => dispatch(TriviaCreators.questionsRequestNext())}
            ref={btnForward}
          >
            Avançar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizModalFeedback;
