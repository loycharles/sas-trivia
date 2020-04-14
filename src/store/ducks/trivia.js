import { createSlugFromString, sortItemsByName, shuffleItems } from 'helpers/utils';

// TODO: Dividir/Organizar esse reducers

/**
 * Actions
 */
export const Types = {
  // CATEGORIES
  CATEGORIES_REQUEST_START: 'sas/trivia/categories/REQUEST_START',
  CATEGORIES_REQUEST_SUCCESS: 'sas/trivia/categories/REQUEST_SUCCESS',
  CATEGORIES_REQUEST_ERROR: 'sas/trivia/categories/REQUEST_ERROR',
  // QUIZ
  QUIZ_CATEGORY_BOOTSTRAP: 'sas/trivia/quiz/CATEGORY_BOOTSTRAP',
  QUIZ_SELECT_CATEGORY: 'sas/trivia/quiz/QUIZ_SELECT_CATEGORY',
  // QUESTIONS
  QUESTIONS_REQUEST_START: 'sas/trivia/questions/REQUEST_START',
  QUESTIONS_REQUEST_SUCCESS: 'sas/trivia/questions/REQUEST_SUCCESS',
  QUESTIONS_REQUEST_EMPTY: 'sas/trivia/questions/REQUEST_EMPTY',
  QUESTIONS_REQUEST_ERROR: 'sas/trivia/questions/REQUEST_ERROR',
  QUESTIONS_SELECT_OPTION: 'sas/trivia/questions/SELECT_OPTION',
  QUESTIONS_ANSWER: 'sas/trivia/questions/ANSWER',
  QUESTIONS_REQUEST_NEXT: 'sas/trivia/questions/REQUEST_NEXT',
  QUESTIONS_NEXT: 'sas/trivia/questions/NEXT',
  QUESTIONS_CHANGE_LEVEL: 'sas/trivia/questions/CHANGE_LEVEL',
  QUESTIONS_REQUEST_SUMMARY: 'sas/trivia/questions/REQUEST_SUMMARY',
};

/**
 * Reducer
 */
const initialState = {
  categories: {
    status: {
      loading: false,
      loaded: false,
      error: false,
    },
    list: [],
  },
  quiz: {
    currentCategory: null,
  },
};

const trivia = (state = initialState, action) => {
  switch (action.type) {
    // CATEGORIES
    case Types.CATEGORIES_REQUEST_START: {
      return {
        ...state,
        categories: {
          ...state.categories,
          status: {
            loading: true,
            loaded: false,
            error: false,
          },
        },
      };
    }
    case Types.CATEGORIES_REQUEST_SUCCESS: {
      let { categories } = action.payload;
      let list = categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: createSlugFromString(category.name),
      }));

      list = sortItemsByName(list);

      return {
        ...state,
        categories: {
          ...state.categories,
          status: {
            loading: false,
            loaded: true,
          },
          list,
        },
      };
    }
    case Types.CATEGORIES_REQUEST_ERROR: {
      return {
        ...state,
        categories: {
          ...state.categories,
          status: {
            loading: false,
            error: action.payload.error,
          },
        },
      };
    }

    // QUIZ
    case Types.QUIZ_CATEGORY_BOOTSTRAP: {
      const { category } = action.payload;
      let quiz = Object.assign({}, state.quiz);

      quiz[category.slug] = {
        ...category,
        status: {
          loading: false,
          error: false,
        },
        questions: {
          easy: {
            loaded: false,
            list: [],
          },
          medium: {
            loaded: false,
            list: [],
          },
          hard: {
            loaded: false,
            list: [],
          },
        },
        currentQuestion: null,
        previousQuestion: null,
        currentQuestionPosition: 0,
        level: 'medium',
        history: [],
      };

      return {
        ...state,
        quiz,
      };
    }
    case Types.QUIZ_SELECT_CATEGORY: {
      const { category } = action.payload;

      return {
        ...state,
        quiz: {
          ...state.quiz,
          currentCategory: category,
        },
      };
    }

    // QUESTIONS
    case Types.QUESTIONS_REQUEST_START: {
      const { category } = action.payload;

      return {
        ...state,
        quiz: {
          ...state.quiz,
          [category.slug]: {
            ...state.quiz[category.slug],
            hasQuestions: true,
            status: {
              loading: true,
              error: false,
            },
          },
        },
      };
    }
    case Types.QUESTIONS_REQUEST_SUCCESS: {
      const { slug, level, questions } = action.payload;
      let list = questions.map((question) => {
        let options = [...question.incorrect_answers, question.correct_answer];
        options = shuffleItems(options);

        return {
          utterance: question.question,
          options,
          correct: question.correct_answer,
          answer: null,
          level: question.difficulty,
        };
      });

      list = shuffleItems(list);

      return {
        ...state,
        quiz: {
          ...state.quiz,
          [slug]: {
            ...state.quiz[slug],
            status: {
              loading: false,
              error: false,
            },
            questions: {
              ...state.quiz[slug].questions,
              [level]: {
                loaded: true,
                list,
              },
            },
          },
        },
      };
    }
    case Types.QUESTIONS_REQUEST_EMPTY: {
      const { category } = action.payload;

      // TODO: Adicionar o status de vazio na lista de categorias

      return {
        ...state,
        quiz: {
          ...state.quiz,
          [category.slug]: {
            ...state.quiz[category.slug],
            hasQuestions: false,
            status: {
              loading: false,
              error: false,
            },
            questions: {
              ...state.quiz[category.slug].questions,
              easy: {
                loaded: true,
                list: [],
              },
              medium: {
                loaded: true,
                list: [],
              },
              hard: {
                loaded: true,
                list: [],
              },
            },
          },
        },
      };
    }
    case Types.QUESTIONS_REQUEST_ERROR: {
      const { slug, error } = action.payload;

      return {
        ...state,
        quiz: {
          ...state.quiz,
          [slug]: {
            ...state.quiz[slug],
            status: {
              loading: false,
              error,
            },
          },
        },
      };
    }
    case Types.QUESTIONS_SELECT_OPTION: {
      const { category_slug, option } = action.payload;

      return {
        ...state,
        quiz: {
          ...state.quiz,
          [category_slug]: {
            ...state.quiz[category_slug],
            currentQuestion: {
              ...state.quiz[category_slug].currentQuestion,
              answer: option,
            },
          },
        },
      };
    }
    case Types.QUESTIONS_ANSWER: {
      const { slug } = state.quiz.currentCategory;
      const { currentQuestion } = state.quiz[slug];

      const question = {
        ...currentQuestion,
        status: {
          answered: true,
          correct: currentQuestion.answer === currentQuestion.correct,
        },
      };

      return {
        ...state,
        quiz: {
          ...state.quiz,
          [slug]: {
            ...state.quiz[slug],
            currentQuestion: question,
            history: [...state.quiz[slug].history, question],
          },
        },
      };
    }
    case Types.QUESTIONS_NEXT: {
      const { slug } = state.quiz.currentCategory;
      const { level, currentQuestion } = state.quiz[slug];

      let list = [...state.quiz[slug].questions[level].list];

      return {
        ...state,
        quiz: {
          ...state.quiz,
          [slug]: {
            ...state.quiz[slug],
            previousQuestion: currentQuestion ? { ...currentQuestion } : null,
            currentQuestion: Object.assign({}, list.shift(), {
              status: {
                answered: false,
                correct: false,
              },
              position: state.quiz[slug].currentQuestionPosition + 1,
            }),
            currentQuestionPosition: state.quiz[slug].currentQuestionPosition + 1,
            questions: {
              ...state.quiz[slug].questions,
              [level]: {
                ...state.quiz[slug].questions[level],
                list,
              },
            },
          },
        },
      };
    }
    case Types.QUESTIONS_CHANGE_LEVEL: {
      const { level } = action.payload;
      const { slug } = state.quiz.currentCategory;

      return {
        ...state,
        quiz: {
          ...state.quiz,
          [slug]: {
            ...state.quiz[slug],
            previousQuestion: null,
            currentQuestion: null,
            level,
          },
        },
      };
    }
    case Types.QUESTIONS_REQUEST_SUMMARY: {
      const { slug } = state.quiz.currentCategory;
      const { history } = state.quiz[slug];

      let score = {
        correct: 0,
        wrong: 0,
      };

      let summary = {
        easy: {
          correct: 0,
          wrong: 0,
        },
        medium: {
          correct: 0,
          wrong: 0,
        },
        hard: {
          correct: 0,
          wrong: 0,
        },
      };

      history.forEach((question) => {
        if (question.status.correct) {
          score.correct += 1;
          summary[question.level].correct += 1;
        } else {
          score.wrong += 1;
          summary[question.level].wrong += 1;
        }
      });

      let list = state.categories.list.map((category) => {
        if (category.slug === slug) {
          return { ...category, score, summary, finished: true };
        }
        return category;
      });

      return {
        ...state,
        categories: {
          ...state.categories,
          list,
        },
      };
    }
    default:
      return state;
  }
};

/**
 * Actions Creators
 */
export const Creators = {
  categoriesRequestStart: () => ({ type: Types.CATEGORIES_REQUEST_START }),
  categoriesRequestSuccess: (categories) => ({
    type: Types.CATEGORIES_REQUEST_SUCCESS,
    payload: { categories },
  }),
  categoriesRequestError: (error) => ({
    type: Types.CATEGORIES_REQUEST_ERROR,
    payload: { error },
  }),

  quizCategoryBootstrap: (category) => ({
    type: Types.QUIZ_CATEGORY_BOOTSTRAP,
    payload: { category },
  }),
  quizSelectCategory: (category) => ({
    type: Types.QUIZ_SELECT_CATEGORY,
    payload: { category },
  }),

  questionsRequestStart: (category) => ({
    type: Types.QUESTIONS_REQUEST_START,
    payload: { category },
  }),
  questionsRequestSuccess: (slug, level, questions) => ({
    type: Types.QUESTIONS_REQUEST_SUCCESS,
    payload: { slug, level, questions },
  }),
  questionsRequestEmpty: (category) => ({
    type: Types.QUESTIONS_REQUEST_EMPTY,
    payload: { category },
  }),
  questionsRequestError: (slug, error) => ({
    type: Types.QUESTIONS_REQUEST_ERROR,
    payload: { slug, error },
  }),
  questionsSelectOption: (category_slug, option) => ({
    type: Types.QUESTIONS_SELECT_OPTION,
    payload: { category_slug, option },
  }),
  questionsAnswer: () => ({
    type: Types.QUESTIONS_ANSWER,
  }),
  questionsRequestNext: () => ({
    type: Types.QUESTIONS_REQUEST_NEXT,
  }),
  questionsNext: () => ({
    type: Types.QUESTIONS_NEXT,
  }),
  questionsChangeLevel: (level) => ({
    type: Types.QUESTIONS_CHANGE_LEVEL,
    payload: { level },
  }),
  questionsRequestSummary: () => ({
    type: Types.QUESTIONS_REQUEST_SUMMARY,
  }),
};

export default trivia;
