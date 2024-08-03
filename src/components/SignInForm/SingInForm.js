import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom/cjs/react-router-dom'

import styles from './SingInForm.module.scss'

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((data) => {
        console.log(data)
        console.log(errors)
      })}
    >
      <h1 className={styles.title}>Sign In</h1>
      <div className={styles.inputsContainer}>
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
      </div>

      <input className={styles.submit} type="submit" value="Login" />

      <div className={styles.toSignUp}>
        Don’t have an account? <Link to="/sign-up"> Sign Up</Link>.
      </div>
    </form>
  )
}

export default SignInForm
