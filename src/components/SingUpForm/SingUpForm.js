import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'

import api from '../../utils/api'
import userActions from '../../redux-store/actions/userActions'
import { currentUserSelectors } from '../../redux-store/selectors'

import styles from './SingUpForm.module.scss'

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useSelector(currentUserSelectors.currentUser)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
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
            const { username, email, password } = data
            try {
              const { user } = await api.registerNewUser(username, email, password)
              dispatch(userActions.setUser(user))
              sessionStorage.setItem('realWorldBlogUser', JSON.stringify(user))
              reset()
            } catch (error) {
              console.error(error)
            } finally {
              setIsLoading(false)
            }
          })}
        >
          <h1 className={styles.title}>Create new account</h1>
          <div className={styles.inputsContainer}>
            <div className={styles.input}>
              <h2 className={styles.inputTitle}>Username</h2>
              <input
                {...register('username', { required: true })}
                className={`${styles.inputArea} ${errors.username && styles.inputInvalid}`}
                placeholder="Username"
              />
              {errors.username && <p>First name is required.</p>}
            </div>
            <div className={styles.input}>
              <h2 className={styles.inputTitle}>Email address</h2>
              <input
                {...register('email', { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
                className={`${styles.inputArea} ${errors.email && styles.inputInvalid}`}
                placeholder="Email address"
              />
              {errors.email && <p>Please, input correct Email address</p>}
            </div>
            <div className={styles.input}>
              <h2 className={styles.inputTitle}>Password</h2>
              <input
                {...register('password', { required: true, minLength: 6, maxLength: 40 })}
                type="password"
                className={`${styles.inputArea} ${errors.password && styles.inputInvalid}`}
                placeholder="Password"
              />
              {errors.password && <p>Your password needs to be at least 6 characters.</p>}
            </div>
            <div className={styles.input}>
              <h2 className={styles.inputTitle}>Repeat Password</h2>
              <input
                {...register('repeatPassword', {
                  required: true,
                  validate: (value) => {
                    if (watch('password') != value) {
                      return 'Your passwords do no match'
                    }
                  },
                })}
                type="password"
                className={`${styles.inputArea} ${errors.repeatPassword && styles.inputInvalid}`}
                placeholder="Password"
              />
              {errors.repeatPassword && <p>Passwords must match</p>}
            </div>
          </div>
          <label className={styles.label}>
            <input {...register('agree', { required: true })} type="checkbox" className={styles.checkbox} />
            <span className={styles.decor}></span>
            <span className={styles.agree}>I agree to the processing of my personal information</span>
          </label>

          <button disabled={isLoading} className={styles.submit} type="submit">
            {isLoading ? <Spin size="small" /> : 'Create'}
          </button>

          <div className={styles.toSignIn}>
            Already have an account? <Link to="/sign-in"> Sign In</Link>.
          </div>
        </form>
      ) : (
        <Redirect to="/" />
      )}
    </>
  )
}

export default SignUpForm
