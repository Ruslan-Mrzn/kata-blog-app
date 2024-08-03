import api from '../../utils/api'
import userActions from '../actions/userActions'

const registerUser = async (data) => {
  const { username, email, password } = data
  return async (dispatch) => {
    const { user } = await api.registerNewUser(username, email, password)
    dispatch(userActions.setUser(user))
    console.log(user)
  }
}

export default registerUser
