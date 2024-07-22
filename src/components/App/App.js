import React from 'react'
import { Pagination } from 'antd'

import Header from '../Header/Header'
import ArticlesList from '../ArticlesList/ArticlesList'
import Article from '../Article/Article'

const App = () => {
  return (
    <>
      <Header />
      <ArticlesList>
        <Article />
        <Article />
      </ArticlesList>
      <Pagination
        size="small"
        current={1}
        onChange={() => {}}
        defaultCurrent={1}
        total={25}
        pageSize={5}
        showSizeChanger={false}
      />
    </>
  )
}

export default App
