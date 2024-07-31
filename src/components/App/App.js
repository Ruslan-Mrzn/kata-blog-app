import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { useLocation } from 'react-router-dom/cjs/react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../Header/Header'
import ArticlesList from '../ArticlesList/ArticlesList'
import fetchArticles from '../../redux-store/asyncActions/fetchArticles'
import { currentArticleSelectors, articlesSelectors } from '../../redux-store/selectors/index.js'
import Article from '../Article/Article.js'

const App = () => {
  const [current, setCurrent] = useState(1)
  const { slug, title, description, body, tagList, createdAt, favoritesCount, author } = useSelector(
    currentArticleSelectors.currentArticle
  )
  const totalArticlesCount = useSelector(articlesSelectors.totalArticlesCount)
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArticles())
  }, [])
  return (
    <>
      <Header />
      {(pathname === '/' || pathname === '/articles') && (
        <>
          <ArticlesList />
          <Pagination
            size="small"
            onChange={(pageNumber) => {
              dispatch(fetchArticles(pageNumber))
              setCurrent(pageNumber)
              window.scroll(0, 0)
            }}
            current={current}
            defaultCurrent={1}
            total={totalArticlesCount}
            pageSize={20}
            showSizeChanger={false}
          />
        </>
      )}
      {pathname === `/articles/${slug}` && (
        <Article
          author={author}
          body={body}
          createdAt={createdAt}
          description={description}
          favoritesCount={favoritesCount}
          slug={slug}
          title={title}
          tagList={tagList}
        />
      )}
    </>
  )
}

export default App
