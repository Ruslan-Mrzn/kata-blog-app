import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'

import api from '../../utils/api'
import userActions from '../../redux-store/actions/userActions'
import { currentUserSelectors } from '../../redux-store/selectors'
import fetchArticles from '../../redux-store/asyncActions/fetchArticles'

import styles from './SingInForm.module.scss'

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [serverErrors, setServerErrors] = useState({})
  const { token } = useSelector(currentUserSelectors.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticles(undefined, token))
  }, [token])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  return (
    <>
      {!token ? (
        <form
          className={styles.form}
          onSubmit={handleSubmit(async (data) => {
            setIsLoading(true)
            const { email, password } = data
            try {
              const { user } = await api.logInUser(email, password)
              dispatch(userActions.setUser(user))
              sessionStorage.setItem('realWorldBlogUser', JSON.stringify(user))
              reset()
            } catch (error) {
              error.json().then(({ errors }) => setServerErrors(errors))
              console.log(serverErrors)
            } finally {
              setIsLoading(false)
            }
          })}
        >
          <h1 className={styles.title}>Sign In</h1>
          <div className={styles.inputsContainer}>
            <div className={styles.input}>
              <h2 className={styles.inputTitle}>Email address</h2>
              <input
                {...register('email', {
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  onChange: () => {
                    setServerErrors({ ...serverErrors, 'email or password': '' })
                  },
                })}
                className={`${styles.inputArea} ${(errors.email || serverErrors['email or password']) && styles.inputInvalid}`}
                placeholder="Email address"
              />
              {errors.email && <p>Please, input correct Email address</p>}
              {serverErrors['email or password'] && <p>{serverErrors['email or password']}</p>}
            </div>
            <div className={styles.input}>
              <h2 className={styles.inputTitle}>Password</h2>
              <input
                {...register('password', {
                  required: true,
                  minLength: 6,
                  maxLength: 40,
                  onChange: () => {
                    setServerErrors({ ...serverErrors, 'email or password': '' })
                  },
                })}
                type="password"
                className={`${styles.inputArea} ${(errors.password || serverErrors['email or password']) && styles.inputInvalid}`}
                placeholder="Password"
              />
              {errors.password && errors.password.type === 'required' && <p>Password is required.</p>}

              {errors.password && errors.password.type === 'minLength' && (
                <p>Your password needs to be at least 6 characters.</p>
              )}
              {errors.password && errors.password.type === 'maxLength' && (
                <p>Your password needs to be less than 40 characters.</p>
              )}

              {serverErrors['email or password'] && <p>{serverErrors['email or password']}</p>}
            </div>
          </div>

          <button disabled={isLoading} className={styles.submit} type="submit">
            {isLoading ? <Spin size="small" /> : 'Login'}
          </button>

          <div className={styles.toSignUp}>
            Don’t have an account? <Link to="/sign-up"> Sign Up</Link>.
          </div>
        </form>
      ) : (
        <Redirect to="/" />
      )}
    </>
  )
}

export default SignInForm
