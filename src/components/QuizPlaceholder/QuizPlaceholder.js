import React from 'react';
import classes from './QuizPlaceholder.module.scss';

const QuizPlaceholder = () => {
  return (
    <div className={classes.QuizPlaceholder}>
      <div className={classes.Title} />
      <div className={classes.Paragraph1} />
      <div className={classes.Paragraph2} />
      <ul>
        {[1, 2, 3, 4].map((item) => (
          <li key={item}>
            <div></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizPlaceholder;
