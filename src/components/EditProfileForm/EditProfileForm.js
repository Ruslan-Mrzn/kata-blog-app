import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

import api from '../../utils/api'
import userActions from '../../redux-store/actions/userActions'
import fetchArticles from '../../redux-store/asyncActions/fetchArticles'
import { currentUserSelectors } from '../../redux-store/selectors'

import styles from './EditProfileForm.module.scss'

const EditProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [serverErrors, setServerErrors] = useState({})
  const { token, username, email, image } = useSelector(currentUserSelectors.currentUser)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  return (
    <>
      {token ? (
        <form
          className={styles.form}
          onSubmit={handleSubmit(async (data) => {
            setIsLoading(true)
            try {
              const { user } = await api.editUserProfile(data, token)
              dispatch(userActions.setUser(user))
              sessionStorage.setItem('realWorldBlogUser', JSON.stringify(user))
              dispatch(fetchArticles(undefined, token))
              reset()
            } catch (error) {
              error.json().then(({ errors }) => {
                setServerErrors(errors)
              })
            } finally {
              setIsLoading(false)
            }
          })}
        >
          <h1 className={styles.title}>Edit Profile</h1>
          <div className={styles.inputsContainer}>
            <div className={styles.input}>
              <h2 className={styles.inputTitle}>Username</h2>
              <input
                {...register('username', {
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                  onChange: () => {
                    setServerErrors({ ...serverErrors, username: '' })
                  },
                })}
                className={`${styles.inputArea} ${(errors.username || serverErrors.username) && styles.inputInvalid}`}
                placeholder="Username"
                defaultValue={username}
              />
              {errors.username && errors.username.type === 'required' && <p>Username is required.</p>}
              {errors.username && errors.username.type === 'minLength' && (
                <p>Username must be at least 3 characters.</p>
              )}
              {errors.username && errors.username.type === 'maxLength' && (
                <p>Username must be no more than 20 characters.</p>
              )}

              {serverErrors.username && <p>{serverErrors.username}</p>}
            </div>
            <div className={styles.input}>
              <h2 className={styles.inputTitle}>Email address</h2>
              <input
                {...register('email', {
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  onChange: () => {
                    setServerErrors({ ...serverErrors, email: '' })
                  },
                })}
                className={`${styles.inputArea} ${(errors.email || serverErrors.email) && styles.inputInvalid}`}
                placeholder="Email address"
                defaultValue={email}
              />
              {errors.email && <p>Please, input correct Email address</p>}
              {serverErrors.email && <p>{serverErrors.email}</p>}
            </div>
            <div className={styles.input}>
              <h2 className={styles.inputTitle}>New password</h2>
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
                className={`${styles.inputArea} ${errors.password && styles.inputInvalid}`}
                placeholder="New password"
              />
              {errors.password && errors.password.type === 'required' && <p>Password is required.</p>}

              {errors.password && errors.password.type === 'minLength' && (
                <p>Your password needs to be at least 6 characters.</p>
              )}
              {errors.password && errors.password.type === 'maxLength' && (
                <p>Your password needs to be less than 40 characters.</p>
              )}
            </div>
            <div className={styles.input}>
              <h2 className={styles.inputTitle}>Avatar image (url)</h2>
              <input
                {...register('image', {
                  required: true,
                  pattern:
                    /[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?/,
                  onChange: () => {
                    setServerErrors({ ...serverErrors, image: '' })
                  },
                })}
                className={`${styles.inputArea} ${(errors.image || serverErrors.image) && styles.inputInvalid}`}
                placeholder="Avatar image"
                defaultValue={image}
              />
              {errors.image && errors.image.type === 'required' && <p>URL is required.</p>}

              {errors.image && errors.image.type === 'pattern' && <p>Please, input correct image url</p>}
              {serverErrors.image && <p>{serverErrors.image}</p>}
            </div>
          </div>

          <button disabled={isLoading} className={styles.submit} type="submit">
            {isLoading ? <Spin size="small" /> : 'Save'}
          </button>
        </form>
      ) : (
        <Redirect to="/" />
      )}
    </>
  )
}

export default EditProfileForm
