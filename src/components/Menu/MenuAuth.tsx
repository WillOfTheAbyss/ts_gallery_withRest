import { IToken } from '../../Interfaces/Interfaces'
import AuthButton from '../Buttons/AuthButton'
import RegButton from '../Buttons/RegButton'

interface MenuAuthProps {
  setTokenData: (token: IToken) => void
  setUserLogin: (login: string) => void
}

const MenuAuth: React.FC<MenuAuthProps> = ({ setUserLogin, setTokenData }) => {
  return (
    <div className='layout-menu-auth'>
      <AuthButton setUserLogin={setUserLogin} setTokenData={setTokenData} />
      <RegButton setUserLogin={setUserLogin} setTokenData={setTokenData} />
    </div>
  )
}

export default MenuAuth
