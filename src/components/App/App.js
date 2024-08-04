import React, { useEffect, useState } from 'react'
import { Pagination, Spin } from 'antd'
import { useLocation } from 'react-router-dom/cjs/react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../Header/Header'
import ArticlesList from '../ArticlesList/ArticlesList'
import fetchArticles from '../../redux-store/asyncActions/fetchArticles'
import { currentArticleSelectors, articlesSelectors, currentUserSelectors } from '../../redux-store/selectors/index.js'
import articlesActions from '../../redux-store/actions/articlesActions.js'
import api from '../../utils/api.js'
import Article from '../Article/Article.js'
import SignUpForm from '../SingUpForm/SingUpForm.js'
import SignInForm from '../SignInForm/SingInForm.js'
import EditProfileForm from '../EditProfileForm/EditProfileForm.js'

const App = () => {
  const [current, setCurrent] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { slug, title, description, body, tagList, createdAt, favoritesCount, author } = useSelector(
    currentArticleSelectors.currentArticle
  )
  const { token } = useSelector(currentUserSelectors.currentUser)
  const totalArticlesCount = useSelector(articlesSelectors.totalArticlesCount)
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArticles(undefined, token))
  }, [])
  return (
    <>
      <Header />
      {(pathname === '/' || pathname === '/articles') && (
        <>
          {isLoading ? <Spin fullscreen={true} size="large" /> : <ArticlesList />}
          <Pagination
            size="small"
            onChange={async (pageNumber) => {
              setIsLoading(true)
              try {
                const { articles, articlesCount } = await api.getArticles(pageNumber, token)
                dispatch(articlesActions.getArticles({ articles, articlesCount }))
                setCurrent(pageNumber)
                window.scroll(0, 0)
              } catch (err) {
                console.error(err)
              } finally {
                setIsLoading(false)
              }
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
      {pathname === '/sign-up' && <SignUpForm />}
      {pathname === '/sign-in' && <SignInForm />}
      {pathname === '/profile' && <EditProfileForm />}
    </>
  )
}

export default App
