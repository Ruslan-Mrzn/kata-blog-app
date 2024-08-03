import api from '../../utils/api'
import singleArticleActions from '../actions/singleArticleActions'

const fetchCurrentArticle = (slug, token) => {
  return async (dispatch) => {
    const { article } = await api.getSingleArticle(slug, token)
    dispatch(singleArticleActions.getSingleArticle(article))
    console.log(article)
  }
}

export default fetchCurrentArticle
