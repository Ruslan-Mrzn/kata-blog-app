import api from '../../utils/api'
import articlesActions from '../actions/articlesActions'

const fetchArticles = (pageNumber = 1, token) => {
  return async (dispatch) => {
    const { articles, articlesCount } = await api.getArticles(pageNumber, token)
    dispatch(articlesActions.getArticles({ articles, articlesCount }))
    console.log(articles)
  }
}

export default fetchArticles
