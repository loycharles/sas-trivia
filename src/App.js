import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from 'components/Header/Header';
import CategoriesPage from 'pages/Categories/CategoriesPage';
import QuizPageRouter from 'pages/Quiz/QuizPageRouter';
import ReportPageRouter from 'pages/Report/ReportPageRouter';

function App() {
  return (
    <>
      <Header />
      <main>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={() => <CategoriesPage />} />
            <Route exact path="/quiz/:slug" component={QuizPageRouter} />
            <Route exact path="/quiz/:slug/resultado" component={() => <ReportPageRouter />} />
            <Route path="*" component={() => <Redirect to={{ pathname: '/' }} />} />
          </Switch>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
