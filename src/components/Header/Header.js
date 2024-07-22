import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'

import styles from './Header.module.scss'
import Logo from './Logo.svg'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link className={styles.logo} to="/">
          <img src={Logo} />
        </Link>
        <nav className={styles.nav}>
          <Link className={styles.signIn} to="/sign-in">
            Sign In
          </Link>
          <Link className={styles.signUp} to="/sign-up">
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
