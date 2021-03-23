import React, { useState, useContext } from 'react'
import { Modal, Button } from 'antd'
import RegForm from '../Forms/RegForm'
import { userAuth, userRegistration } from '../../service/AxiosService'
import { IToken, RegData } from '../../Interfaces/Interfaces'
import AuthContext from '../Context/AuthContext'

interface RegButtonProps {
  setUserLogin: (login: string) => void
  setTokenData: (token: IToken) => void
}

const RegButton: React.FC<RegButtonProps> = ({ setUserLogin, setTokenData }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [formData, setFormData] = useState<RegData>({
    userName: '',
    email: '',
    fullName: '',
    phone: '',
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
    userRegistration(formData)
      .then(res => setUserLogin(res.username))
      .then(async () => await userAuth(formData, auth.client))
      .then(res => setTokenData(res))
      .then(() => setConfirmLoading(true))
      .catch(() => {
        setConfirmLoading(false)
        setError(true)
      })
  }

  return (
    <>
      <Button className='layout-menu-auth__item primary' onClick={showModal}>
        Sign up
      </Button>
      <Modal
        title='Sign up'
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
        centered = {true}
      >
        <RegForm
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

export default React.memo(RegButton)
