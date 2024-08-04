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

  getRatedMovies(guestId) {
    return fetch(`${this._baseUrl}guest_session/${guestId}/rated/movies`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  getRatedMoviesFromPage(guestId, pageNumber) {
    return fetch(`${this._baseUrl}guest_session/${guestId}/rated/movies?page=${pageNumber}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  getSearchedMovies(query) {
    return fetch(`${this._baseUrl}search/movie?query=${query}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  getPaginationMovies(query, pageNumber) {
    return fetch(`${this._baseUrl}search/movie?query=${query}&page=${pageNumber}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  getGenres() {
    return fetch(`${this._baseUrl}genre/movie/list`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  addRating(movieId, guestId, value) {
    return fetch(`${this._baseUrl}movie/${movieId}/rating?guest_session_id=${guestId}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ value: value }),
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
