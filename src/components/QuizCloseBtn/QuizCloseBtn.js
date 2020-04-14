import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as CloseIcon } from 'assets/imgs/close-icon.svg';
import './QuizCloseBtn.scss';

const QuizCloseBtn = (props) => (
  <NavLink exact to="/" className={`QuizCloseBtn ${props.className}`}>
    <CloseIcon role="img" alt="Ícone de Fechar" />
    <span>Fechar</span>
  </NavLink>
);

export default QuizCloseBtn;
