import React from 'react'
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom'
import { format } from 'date-fns'
import markdownit from 'markdown-it'
import { useDispatch, useSelector } from 'react-redux'

import { currentUserSelectors } from '../../redux-store/selectors'
import fetchCurrentArticle from '../../redux-store/asyncActions/fetchCurrentArticle'

import styles from './Article.module.scss'

const Article = ({ slug, title, description, body, createdAt, tagList, favoritesCount, author }) => {
  const { token } = useSelector(currentUserSelectors.currentUser)
  const dispatch = useDispatch()
  const md = markdownit()
  const result = md.render(`${body}`)
  const { pathname } = useLocation()
  return (
    <article>
      <div className={styles.main}>
        <div className={styles.titleContainer}>
          <Link
            onClick={() => dispatch(fetchCurrentArticle(slug, token))}
            to={`/articles/${slug}`}
            className={styles.title}
          >
            {title}
          </Link>
          <button className={styles.inactiveLike} type="button"></button>
          <span className={styles.likesCount}>{favoritesCount}</span>
        </div>
        <ul className={styles.tagsContainer}>
          {tagList.map((tag, index) => {
            return (
              tag && (
                <li key={index} className={styles.tag}>
                  {tag}
                </li>
              )
            )
          })}
        </ul>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.user}>
        <div className={styles.userTextBlock}>
          <p className={styles.userName}>{author.username}</p>
          <p className={styles.date}>{format(createdAt, 'MMMM d, yyyy')}</p>
        </div>

        <img className={styles.userAvatar} src={author.image} />
      </div>
      {pathname === `/articles/${slug}` && (
        <section className={styles.fullArticle} dangerouslySetInnerHTML={{ __html: result }}></section>
      )}
    </article>
  )
}

export default Article
