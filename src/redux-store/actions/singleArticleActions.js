import types from '../action-types/singleArticleTypes'

const getSingleArticle = (payload) => ({ type: types.SET_CURRENT_ARTICLE, payload })

export default {
  getSingleArticle,
}
