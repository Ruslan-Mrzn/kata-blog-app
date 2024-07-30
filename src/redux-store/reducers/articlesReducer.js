import types from '../action-types/articlesTypes'

export const articlesReducer = (state = [], action) => {
  if (action.type === types.SET_ARTICLES) {
    return [...action.payload]
  }

  return state
}
