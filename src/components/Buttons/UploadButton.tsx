import { Button, Modal } from 'antd'
import React, { useState, useContext } from 'react'
import { IToken, UploadData } from '../../Interfaces/Interfaces'
import { postPhoto } from '../../service/AxiosService'
import UploadForm from '../Forms/UploadForm'
import AuthContext from '../Context/AuthContext'

interface UploadButtonProps {
  setTokenData: (tokenData: IToken) => void
}

const UploadButton: React.FC<UploadButtonProps> = ({ setTokenData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [formData, setFormData] = useState<UploadData>({
    name: '',
    description: '',
    id: 0
  })
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const auth = useContext(AuthContext)

  const showModal = (): void => {
    setIsModalVisible(true)
  }

  const handleCancel = (): void => {
    setIsModalVisible(false)
  }

  const onFinish = (): void => {
    setConfirmLoading(true)
    postPhoto(formData, auth.token.access_token)
      .then(res => setFormData({
        name: '',
        description: '',
        id: 0
      }))
      .then(() => setConfirmLoading(false))
      .then(() => setIsModalVisible(false))
      .catch((err) => console.log(err))
  }

  return (
    <>
      <Button className='layout-menu-auth__item primary' onClick={showModal}>
        Upload
      </Button>
      <Modal
        title='Upload Image'
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
        centered = {true}
      >
        <UploadForm
          formData={formData}
          setFormData={setFormData}
          onFinish={onFinish}
          setTokenData={setTokenData}
          confirmLoading = {confirmLoading}
        />
      </Modal>
    </>
  )
}

export default React.memo(UploadButton)
