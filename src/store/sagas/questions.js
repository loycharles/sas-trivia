import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { Types as TriviaTypes, Creators as TriviaCreators } from '../ducks/trivia';
import api from '../../services/api';

function* getList(action) {
  const { category } = action.payload;

  try {
    const query_category = category.id;
    const query_difficulty = category.level;
    const query_amount = 8;
    const query_type = 'multiple';

    const request = yield call(
      api.get,
      `https://opentdb.com/api.php?amount=${query_amount}&category=${query_category}&difficulty=${query_difficulty}&type=${query_type}`
    );
    const response = request.data;

    if (response.response_code || !response.results || !response.results.length) {
      if (response.response_code === 1) {
        // code for no results for trivia questions request
        yield put(TriviaCreators.questionsRequestEmpty(category));
      } else {
        throw new Error('Falha ao obter as perguntas');
      }
    } else {
      yield put(
        TriviaCreators.questionsRequestSuccess(category.slug, category.level, response.results)
      );
      yield put(TriviaCreators.questionsNext());
    }
  } catch (error) {
    yield put(TriviaCreators.questionsRequestError(category.slug, error.message));
  }
}

function* requestNext() {
  const quiz = yield select((state) => state.trivia.quiz);
  const category_quiz = quiz[quiz.currentCategory.slug];

  if (category_quiz.previousQuestion) {
    if (category_quiz.history.length < 10) {
      let next_level = '';

      if (
        category_quiz.previousQuestion.status.correct &&
        category_quiz.currentQuestion.status.correct &&
        category_quiz.level !== 'hard'
      ) {
        next_level = category_quiz.level === 'easy' ? 'medium' : 'hard';
      } else if (
        !category_quiz.previousQuestion.status.correct &&
        !category_quiz.currentQuestion.status.correct &&
        category_quiz.level !== 'easy'
      ) {
        next_level = category_quiz.level === 'hard' ? 'medium' : 'easy';
      } else {
        next_level = category_quiz.level;
      }

      if (category_quiz.level === next_level) {
        yield put(TriviaCreators.questionsNext());
      } else {
        yield put(TriviaCreators.questionsChangeLevel(next_level));
        if (category_quiz.questions[next_level].loaded) {
          yield put(TriviaCreators.questionsNext());
        }
      }
    } else {
      yield put(TriviaCreators.questionsRequestSummary());
    }
  } else {
    yield put(TriviaCreators.questionsNext());
  }
}

export default function* questions() {
  return yield all([
    takeLatest(TriviaTypes.QUESTIONS_REQUEST_START, getList),
    takeLatest(TriviaTypes.QUESTIONS_REQUEST_NEXT, requestNext),
  ]);
}
