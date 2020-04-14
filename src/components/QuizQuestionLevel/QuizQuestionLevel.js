import React from 'react';
import clsx from 'clsx';
import { ReactComponent as StarsLevelEasyIcon } from 'assets/imgs/stars-level-easy.svg';
import { ReactComponent as StarsLevelMediumIcon } from 'assets/imgs/stars-level-medium.svg';
import { ReactComponent as StarsLevelHardIcon } from 'assets/imgs/stars-level-hard.svg';
import classes from './QuizQuestionLevel.module.scss';

const QuizQuestionLevelContent = ({ level }) => {
  switch (level) {
    case 'easy':
      return (
        <>
          <StarsLevelEasyIcon role="img" alt="Ícone Uma Estrela" />
          <span>Fácil</span>
        </>
      );
    case 'medium':
      return (
        <>
          <StarsLevelMediumIcon role="img" alt="Ícone Duas Estrelas" />
          <span>Médio</span>
        </>
      );
    case 'hard':
      return (
        <>
          <StarsLevelHardIcon role="img" alt="Ícone Três Estrelas" />
          <span>Difícil</span>
        </>
      );
    default:
      return null;
  }
};

const QuizQuestionLevel = ({ level, className, ...other }) => (
  <span aria-label="Nível" className={clsx(classes.QuizQuestionLevel, className)} {...other}>
    <QuizQuestionLevelContent level={level} />
  </span>
);

export default QuizQuestionLevel;
