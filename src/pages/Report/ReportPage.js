import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'components/Button/Button';
import { ReactComponent as MascotIcon } from 'assets/imgs/mascot.svg';
import classes from './ReportPage.module.scss';

const ReportPage = ({ category }) => {
  const history = useHistory();

  return (
    <div className={classes.ReportPage}>
      <header className={classes.ReportPageHeader}>
        <MascotIcon role="img" alt="Mascote comemorando" />
        <div className={classes.ReportPageHeaderMessage}>
          <h2>Parabéns!</h2>
          <h3>Você finalizou o teste</h3>
        </div>
      </header>

      <h4>
        <span>Veja seu desempenho nas questões</span>
      </h4>

      <div className={classes.ReportPageScore}>
        <div>
          <span>{category.score.correct}</span>
          <h5>acertos</h5>
        </div>
        <div>
          <span>{category.score.wrong}</span>
          <h5>erros</h5>
        </div>
      </div>
      <div className={classes.ReportPageSummary}>
        <div>
          <div>
            <h5>Fácil</h5>
            <span>Acertos: {category.summary.easy.correct}</span>
            <br />
            <span>Erros: {category.summary.easy.wrong}</span>
          </div>
        </div>
        <div>
          <div>
            <h5>Médio</h5>
            <span>Acertos: {category.summary.medium.correct}</span>
            <br />
            <span>Erros: {category.summary.medium.wrong}</span>
          </div>
        </div>
        <div>
          <div>
            <h5>Difícil</h5>
            <span>Acertos: {category.summary.hard.correct}</span>
            <br />
            <span>Erros: {category.summary.hard.wrong}</span>
          </div>
        </div>
      </div>

      <div className={classes.btnContainer}>
        <Button onClick={() => history.push('/')}>Voltar ao início</Button>
      </div>
    </div>
  );
};

export default ReportPage;
