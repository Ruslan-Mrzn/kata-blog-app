import React from 'react'

import styles from './ArticlesList.module.scss'

const ArticlesList = ({ children }) => {
  return <ul className={styles.list}>{children}</ul>
}

export default ArticlesList
