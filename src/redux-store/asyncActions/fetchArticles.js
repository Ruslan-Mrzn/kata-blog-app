import api from '../../utils/api'
import articleActions from '../actions/articlesActions'

const fetchArticles = () => {
  return async (dispatch) => {
    const { articles } = await api.getArticles()
    dispatch(articleActions.getArticles(articles))
    console.log(articles)
  }
}

export default fetchArticles
