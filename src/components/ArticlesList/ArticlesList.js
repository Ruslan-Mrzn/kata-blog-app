import React from 'react'
import { useSelector } from 'react-redux'

import { articlesSelectors } from '../../redux-store/selectors/index.js'
import Article from '../Article/Article'

import styles from './ArticlesList.module.scss'

const ArticlesList = ({ currentPage }) => {
  const articles = useSelector(articlesSelectors.articles)
  return (
    <ul className={styles.list}>
      {articles.map(({ slug, title, description, body, createdAt, favoritesCount, tagList, author, favorited }) => {
        return (
          <Article
            key={slug}
            slug={slug}
            title={title}
            description={description}
            body={body}
            createdAt={createdAt}
            tagList={tagList}
            author={author}
            favorited={favorited}
            currentPage={currentPage}
            favoritesCount={favoritesCount}
          />
        )
      })}
    </ul>
  )
}

export default ArticlesList
