import types from '../action-types/articlesTypes'

const getArticles = (payload) => ({ type: types.SET_ARTICLES, payload })

export default {
  getArticles,
}
