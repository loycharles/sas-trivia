import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  Types as TriviaTypes,
  Creators as TriviaCreators,
} from '../ducks/trivia';
import api from '../../services/api';

function* getList() {
  try {
    const request = yield call(api.get, 'https://opentdb.com/api_category.php');
    const response = request.data;

    if (!response.trivia_categories || !response.trivia_categories.length)
      throw new Error('Falha ao obter a lista de categorias');

    yield put(
      TriviaCreators.categoriesRequestSuccess(response.trivia_categories)
    );
  } catch (error) {
    yield put(TriviaCreators.categoriesRequestError(error.message));
  }
}

export default function* categories() {
  return yield all([takeLatest(TriviaTypes.CATEGORIES_REQUEST_START, getList)]);
}
