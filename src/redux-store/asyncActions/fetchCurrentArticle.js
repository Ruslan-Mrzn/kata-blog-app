import api from '../../utils/api'
import singleArticleActions from '../actions/singleArticleActions'

const fetchCurrentArticle = (slug) => {
  return async (dispatch) => {
    const { article } = await api.getSingleArticle(slug)
    dispatch(singleArticleActions.getSingleArticle(article))
    console.log(article)
  }
}

export default fetchCurrentArticle
