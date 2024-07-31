import types from '../action-types/articlesTypes'

const defaultState = {
  articles: [],
  totalArticlesCount: null,
}

export const articlesReducer = (state = defaultState, action) => {
  if (action.type === types.SET_ARTICLES) {
    return action.payload
  }

  return state
}
