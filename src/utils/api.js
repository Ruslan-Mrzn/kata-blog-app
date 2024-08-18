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
    return fetch(`${this._baseUrl}/articles?limit=5&&offset=${(pageNumber - 1) * 5} `, {
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
    return fetch(`${this._baseUrl}/user`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user: data }),
    }).then(this._checkResponse)
  }

  addNewArticle(data, token) {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ article: data }),
    }).then(this._checkResponse)
  }
  deleteArticle(slug, token) {
    return fetch(`${this._baseUrl}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    })
  }
  editArticle(data, token, slug) {
    return fetch(`${this._baseUrl}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ article: data }),
    }).then(this._checkResponse)
  }
  likeArticle(slug, token) {
    return fetch(`${this._baseUrl}/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse)
  }
  dislikeArticle(slug, token) {
    return fetch(`${this._baseUrl}/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
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
