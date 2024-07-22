import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'

import styles from './Article.module.scss'

const Article = () => {
  return (
    <article>
      <div className={styles.main}>
        <div className={styles.titleContainer}>
          <Link className={styles.title}>Some article title</Link>
          <button className={styles.inactiveLike} type="button"></button>
          <span className={styles.likesCount}>12</span>
        </div>
        <ul className={styles.tagsContainer}>
          <li className={styles.tag}>Tag 1</li>
          <li className={styles.tag}>Tag 2</li>
        </ul>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </div>
      <div className={styles.user}>
        <div className={styles.userTextBlock}>
          <p className={styles.userName}>John Doe</p>
          <p className={styles.date}>March 5, 2020 </p>
        </div>
        <div className={styles.userAvatar}>
          <img className={styles.userPhoto} />
        </div>
      </div>
    </article>
  )
}

export default Article
