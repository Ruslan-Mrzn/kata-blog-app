import types from '../action-types/singleArticleTypes'

const defaultState = {
  slug: null,
  title: null,
  description: null,
  body: null,
  tags: null,
  createdAt: null,
  favoritesCount: null,
  favorited: null,
  author: null,
}

export const currentArticleReducer = (state = defaultState, action) => {
  if (action.type === types.SET_CURRENT_ARTICLE) {
    return { ...state, ...action.payload }
  }

  return state
}
