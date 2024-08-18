import api from '../../utils/api'
import singleArticleActions from '../actions/singleArticleActions'

const fetchCurrentArticle = (slug, token) => {
  return async (dispatch) => {
    const { article } = await api.getSingleArticle(slug, token)
    dispatch(singleArticleActions.getSingleArticle(article))
  }
}

export default fetchCurrentArticle
