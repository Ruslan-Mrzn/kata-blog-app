import React, { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom'

import fetchArticles from '../../redux-store/asyncActions/fetchArticles'
import api from '../../utils/api'
import { currentUserSelectors } from '../../redux-store/selectors'

import styles from './NewArticleForm.module.scss'

const NewArticleForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [serverErrors, setServerErrors] = useState({})
  const { token } = useSelector(currentUserSelectors.currentUser)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tagList: [{ tag: '' }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })
  const dispatch = useDispatch()
  const history = useHistory()
  return (
    <>
      {token ? (
        <form
          className={styles.form}
          onSubmit={handleSubmit(async (data) => {
            setIsLoading(false)
            try {
              const tagList = data.tagList.map((tag) => tag.tag)
              const newArticleData = { ...data, tagList: tagList }
              await api.addNewArticle(newArticleData, token)
              dispatch(fetchArticles(undefined, token))
              reset()
              history.push('/')
            } catch (error) {
              error.json().then(({ errors }) => {
                setServerErrors(errors)
                console.log(serverErrors)
              })
            } finally {
              setIsLoading(false)
            }
          })}
        >
          <h1 className={styles.title}>Create new article</h1>
          <div className={styles.inputsContainer}>
            <div className={styles.input}>
              <h2 className={styles.inputTitle}>Title</h2>
              <input
                {...register('title', {
                  required: true,
                  onChange: () => {
                    setServerErrors({ ...serverErrors, title: '' })
                  },
                })}
                className={`${styles.inputArea} ${(errors.title || serverErrors.title) && styles.inputInvalid}`}
                placeholder="Title"
              />
              {errors.title && errors.title.type === 'required' && <p>Title is required.</p>}

              {serverErrors.title && <p>{serverErrors.title}</p>}
            </div>
            <div className={styles.input}>
              <h2 className={styles.inputTitle}>Short description</h2>
              <input
                {...register('description', {
                  required: true,
                  onChange: () => {
                    setServerErrors({ ...serverErrors, description: '' })
                  },
                })}
                className={`${styles.inputArea} ${(errors.description || serverErrors.description) && styles.inputInvalid}`}
                placeholder="Short description"
              />
              {errors.description && <p>Description is required.</p>}
              {serverErrors.description && <p>{serverErrors.description}</p>}
            </div>
            <div className={styles.input}>
              <h2 className={styles.inputTitle}>Text</h2>
              <textarea
                {...register('body', {
                  required: true,
                  onChange: () => {
                    setServerErrors({ ...serverErrors, body: '' })
                  },
                })}
                className={`${styles.inputArea} ${styles.textArea} ${(errors.body || serverErrors.body) && styles.inputInvalid}`}
                placeholder="Text"
              />
              {errors.body && errors.body.type === 'required' && <p>Text is required.</p>}
              {serverErrors.body && <p>{serverErrors.description}</p>}
            </div>
            <div className={styles.input}>
              <h2 className={styles.inputTitle}>Tags</h2>
              <div className={styles.tagsContainer}>
                <ul className={styles.tagList}>
                  {fields.map((field, index) => (
                    <li key={field.id} className={styles.tagItem}>
                      <input
                        // important to include key with field's id
                        {...register(`tagList.${index}.tag`)}
                        className={`${styles.inputArea} ${styles.tagInput}`}
                        placeholder="Tag"
                      />
                      <button type="button" className={styles.tagDelete} onClick={() => remove(index)}>
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
                <button onClick={() => append({ tag: '' })} type="button" className={styles.tagAdd}>
                  Add tag
                </button>
              </div>
            </div>
          </div>

          <button disabled={isLoading} className={styles.submit} type="submit">
            {isLoading ? <Spin size="small" /> : 'Send'}
          </button>
        </form>
      ) : (
        <Redirect to="/" />
      )}
    </>
  )
}

export default NewArticleForm
