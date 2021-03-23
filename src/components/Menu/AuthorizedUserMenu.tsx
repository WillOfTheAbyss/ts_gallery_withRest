import { Button } from 'antd'
import { IToken } from '../../Interfaces/Interfaces'
import UploadButton from '../Buttons/UploadButton'

interface AuthorizedUserMenuProps {
  userLogin: string
  setTokenData: (tokenData: IToken) => void
}

const AuthorizedUserMenu: React.FC<AuthorizedUserMenuProps> = ({ setTokenData, userLogin }) => {
  return (
    <div className='layout-menu-auth'>
      <div className='layout-menu-auth__item'>
        {userLogin}
      </div>
      <Button className='layout-menu-auth__item' onClick={() => setTokenData({ access_token: '', refresh_token: '' })}>
        LogOut
      </Button>
      <UploadButton setTokenData={setTokenData} />
    </div>
  )
}

export default AuthorizedUserMenu
