import api from '../../utils/api'
import articleActions from '../actions/articlesActions'

const fetchArticles = (pageNumber = 1, token) => {
  return async (dispatch) => {
    const { articles, articlesCount } = await api.getArticles(pageNumber, token)
    dispatch(articleActions.getArticles({ articles, articlesCount }))
    console.log(articles)
  }
}

export default fetchArticles
