import React, { useState, useContext } from 'react'
import { Modal, Button } from 'antd'
import { userAuth } from '../../service/AxiosService'
import AuthForm from '../Forms/AuthFrom'
import { AuthData, IToken } from '../../Interfaces/Interfaces'
import AuthContext from '../Context/AuthContext'

interface AuthButtonProps {
  setTokenData: (token: IToken) => void
  setUserLogin: (login: string) => void
}

const AuthButton: React.FC<AuthButtonProps> = ({ setTokenData, setUserLogin }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [formData, setFormData] = useState<AuthData>({
    userName: '',
    password: ''
  })
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const auth = useContext(AuthContext)

  const showModal = (): void => {
    setIsModalVisible(true)
  }

  const handleCancel = (): void => {
    setIsModalVisible(false)
    setError(false)
  }

  const onFinish = (): void => {
    setError(false)
    setConfirmLoading(true)
    userAuth(formData, auth.client)
      .then((res) => {
        setConfirmLoading(false)
        setTokenData(res)
        setUserLogin(formData.userName)
      })
      .catch(() => {
        setConfirmLoading(false)
        setError(true)
      })
  }

  return (
    <>
      <Button className='layout-menu-auth__item' onClick={showModal}>
        Sign in
      </Button>
      <Modal
        title='Sign in'
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
        centered = {true}
      >
        <AuthForm
          formData={formData}
          setFormData={setFormData}
          onFinish={onFinish}
          confirmLoading={confirmLoading}
          error={error}
        />
      </Modal>
    </>
  )
}

export default React.memo(AuthButton)
