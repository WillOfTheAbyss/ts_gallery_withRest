import { Menu } from 'antd'
import { IToken } from '../../Interfaces/Interfaces'
import AuthorizedUserMenu from './AuthorizedUserMenu'
import MenuAuth from './MenuAuth'
import React, { useState, useContext } from 'react'
import AuthContext from '../Context/AuthContext'

interface MenuBarProps {
  sort: string
  setSort: (param: string) => void
  setPage: (page: number) => void
  setTokenData: (token: IToken) => void
}

const MenuBar: React.FC<MenuBarProps> = ({ sort, setSort, setPage, setTokenData }) => {
  const [userLogin, setUserLogin] = useState<string>('')
  const auth = useContext(AuthContext)

  return (
    <Menu
      className='layout-menu'
      mode='horizontal'
      selectedKeys={[sort]}
    >
      <Menu.Item
        className='layout-menu__item'
        key='new'
        onClick={() => {
          setSort('new')
          setPage(1)
        }}
      >
        New
      </Menu.Item>
      <Menu.Item
        className='layout-menu__item'
        key='popular'
        onClick={() => {
          setSort('popular')
          setPage(1)
        }}
      >
        Popular
      </Menu.Item>
      {auth.token.access_token
        ? <AuthorizedUserMenu userLogin={userLogin} setTokenData={setTokenData} />
        : <MenuAuth setUserLogin={setUserLogin} setTokenData={setTokenData} />}
    </Menu>
  )
}

export default React.memo(MenuBar)
