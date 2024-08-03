import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useSelector } from 'react-redux'

import { currentUserSelectors } from '../../redux-store/selectors'

import styles from './Header.module.scss'
import Logo from './Logo.svg'

const Header = () => {
  const { username, image } = useSelector(currentUserSelectors.currentUser)
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link className={styles.logo} to="/">
          <img src={Logo} />
        </Link>
        <nav className={styles.nav}>
          {!username && (
            <Link className={styles.signIn} to="/sign-in">
              Sign In
            </Link>
          )}
          {!username && (
            <Link className={styles.signUp} to="/sign-up">
              Sign Up
            </Link>
          )}
          {username && (
            <Link className={styles.createArticle} to="/new-article">
              Create article
            </Link>
          )}
          {username && (
            <div className={styles.user}>
              <Link className={styles.userName} to="/profile">
                {username}
              </Link>
              <img className={styles.userAvatar} src={image} />
            </div>
          )}
          {username && (
            <Link className={styles.logOut} to="/">
              Log Out
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
