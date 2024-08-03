import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import { thunk } from 'redux-thunk'

import { articlesReducer } from './redux-store/reducers/articlesReducer'
import { currentArticleReducer } from './redux-store/reducers/singleArticleReducer'
import { userReducer } from './redux-store/reducers/userReducer'
import App from './components/App/App'
import './scss/index.scss'

const rootReducer = combineReducers({
  articles: articlesReducer,
  currentArticle: currentArticleReducer,
  currentUser: userReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
