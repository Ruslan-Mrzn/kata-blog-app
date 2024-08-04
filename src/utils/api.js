class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res)
  }

  getArticles(pageNumber, token) {
    return fetch(`${this._baseUrl}/articles?offset=${(pageNumber - 1) * 20} `, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse)
  }

  getSingleArticle(slug, token) {
    return fetch(`${this._baseUrl}/articles/${slug}`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse)
  }

  registerNewUser(username, email, password) {
    return fetch(`${this._baseUrl}/users`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ user: { username, email, password } }),
    }).then(this._checkResponse)
  }

  logInUser(email, password) {
    return fetch(`${this._baseUrl}/users/login`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ user: { email, password } }),
    }).then(this._checkResponse)
  }

  editUserProfile(data, token) {
    console.log(data)
    return fetch(`${this._baseUrl}/user`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user: data }),
    }).then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'https://blog.kata.academy/api',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
})

export default api
