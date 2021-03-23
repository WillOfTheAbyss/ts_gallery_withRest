import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import logo from './logo.svg'
import { Header, Content } from 'antd/lib/layout/layout'
import MenuBar from './components/Menu/MenuBar'
import PageCounter from './components/PageCounter'
import { createClient, getPhotos } from './service/AxiosService'
import CardsTable from './components/CardsTable'
import { IClientResponse, IPhotosData, IToken } from './Interfaces/Interfaces'
import AuthContext from './components/Context/AuthContext'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'

const App: React.FC = () => {
  const [sort, setSort] = useState<string>('')
  const [clientData, setClientData] = useState<IClientResponse>({
    id: 0,
    secret: '',
    randomId: ''
  })
  const [tokenData, setTokenData] = useState<IToken>({
    access_token: '',
    refresh_token: ''
  })
  const [page, setPage] = useState<number>(0)
  const [itemCount, setItemCount] = useState<number>(0)
  const [photos, setPhotos] = useState<IPhotosData[]>([])
  const [firstLoad, setFirstLoad] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const queryString = require('query-string')
  const history = useHistory()

  useEffect(() => {
    const parsed = queryString.parse(history.location.search)
    parsed.sort === 'new' || parsed.sort === 'popular' ? setSort(parsed.sort) : setSort('new')
    parsed.page > 1 ? setPage(+parsed.page) : setPage(1)
    const savedClientData = JSON.parse(
      localStorage.getItem('clientData') ||
        '[{ "id": 0, "secret": "", "randomId": "" }]'
    ) as IClientResponse
    const savedTokenData = JSON.parse(
      localStorage.getItem('tokenData') ||
        '[{"access_token": "",refresh_token: ""}]'
    ) as IToken
    if (!savedClientData.id) {
      createClient().then((res) => {
        localStorage.setItem('clientData', JSON.stringify(res))
        setClientData({
          id: res.id,
          secret: res.secret,
          randomId: res.randomId
        })
      }).catch(err => console.log(err))
    } else {
      setClientData(savedClientData)
      setTokenData(savedTokenData)
    }
  }, [])

  useEffect(() => {
    history.push({
      pathname: '/gallery',
      search: `?sort=${sort}&page=${page}`
    })
    setLoading(true)
    setError(false)
    if (!firstLoad) {
      getPhotos(page, sort)
        .then((res) => {
          setPhotos(res.data)
          setItemCount(res.totalItems)
          setLoading(false)
          if (res.data.length === 0) setError(true)
        })
        .catch(() => setError(true))
    }
    setFirstLoad(false)
  }, [sort, page])

  useEffect(() => {
    localStorage.setItem('tokenData', JSON.stringify(tokenData))
  }, [tokenData])

  return (
    <Switch>
      <Route
        exact
        path='/'
        render={() => {
          return <Redirect to='/gallery' />
        }}
      />
      <Route
        path='/gallery'
        render={() => {
          return (
            <AuthContext.Provider
              value={{ client: clientData, token: tokenData }}
            >
              <Layout className='layout'>
                <Header className='layout-header'>
                  <img
                    src={logo}
                    className='layout-header-logo'
                    alt='logo'
                  />
                  <MenuBar
                    sort={sort}
                    setSort={setSort}
                    setPage={setPage}
                    setTokenData={setTokenData}
                  />
                </Header>
                <Content className='layout-content'>
                  <div className='layout-content-wrapper'>
                    <CardsTable photos={photos} error={error} loading={loading} />
                  </div>
                  <PageCounter
                    setPage={setPage}
                    itemCount={itemCount}
                    page={page}
                    loading={loading}
                    error={error}
                  />
                </Content>
              </Layout>
            </AuthContext.Provider>
          )
        }}
      />
    </Switch>
  )
}

export default React.memo(App)
