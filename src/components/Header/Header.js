import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { currentUserSelectors } from '../../redux-store/selectors'
import userActions from '../../redux-store/actions/userActions'
import fetchArticles from '../../redux-store/asyncActions/fetchArticles'

import styles from './Header.module.scss'
import Logo from './Logo.svg'

const Header = () => {
  const { username, image } = useSelector(currentUserSelectors.currentUser)
  const dispatch = useDispatch()
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
            <Link
              onClick={() => {
                dispatch(
                  userActions.setUser({
                    bio: null,
                    email: null,
                    image:
                      'https://img.freepik.com/premium-vector/anonymous-hooded-avatar-hidden-user-incognito-hacker-isolated-vector-illustration_619989-1263.jpg',
                    token: null,
                    username: null,
                  })
                )
                dispatch(fetchArticles(undefined, ''))
                sessionStorage.removeItem('realWorldBlogUser')
              }}
              className={styles.logOut}
              to="/"
            >
              Log Out
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
