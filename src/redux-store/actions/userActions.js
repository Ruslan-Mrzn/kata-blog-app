import types from '../action-types/userTypes'

const setUser = (payload) => ({ type: types.SET_USER, payload })

export default {
  setUser,
}
