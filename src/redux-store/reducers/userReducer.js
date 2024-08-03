import types from '../action-types/userTypes'

let defaultState = {
  bio: null,
  email: null,
  image:
    'https://img.freepik.com/premium-vector/anonymous-hooded-avatar-hidden-user-incognito-hacker-isolated-vector-illustration_619989-1263.jpg',
  token: null,
  username: null,
}

if (sessionStorage.getItem('realWorldBlogUser')) {
  const { bio, email, image, token, username } = JSON.parse(sessionStorage.getItem('realWorldBlogUser'))
  defaultState = {
    bio,
    email,
    image: image
      ? image
      : 'https://img.freepik.com/premium-vector/anonymous-hooded-avatar-hidden-user-incognito-hacker-isolated-vector-illustration_619989-1263.jpg',
    token,
    username,
  }
}

export const userReducer = (state = defaultState, action) => {
  if (action.type === types.SET_USER) {
    return {
      ...state,
      ...action.payload,
      image: action.payload.image
        ? action.payload.image
        : 'https://img.freepik.com/premium-vector/anonymous-hooded-avatar-hidden-user-incognito-hacker-isolated-vector-illustration_619989-1263.jpg',
    }
  }

  return state
}
