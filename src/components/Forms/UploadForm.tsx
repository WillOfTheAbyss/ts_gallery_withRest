import React, { useState, useContext } from 'react'
import { Form, Input, Button, Upload } from 'antd'
import { UserOutlined, UploadOutlined } from '@ant-design/icons'
import { deleteImage, uploadImage } from '../../service/AxiosService'
import { IToken, UploadData } from '../../Interfaces/Interfaces'

import { RcFile } from 'antd/lib/upload'
import AuthContext from '../Context/AuthContext'

interface UploadFormProps {
  formData: UploadData
  confirmLoading: boolean
  setFormData: (data: (prev: UploadData) => UploadData) => void
  onFinish: (values: UploadData) => void
  setTokenData: (tokenData: IToken) => void
}

const UploadForm: React.FC<UploadFormProps> = ({ formData, setFormData, onFinish, setTokenData,confirmLoading }) => {
  const [authError, setAuthError] = useState<boolean>(false)
  const auth = useContext(AuthContext)

  const customRequestHandler = async (onSuccess: Function, onError: Function, file: string | RcFile | Blob) => {
    if (formData.id) {
      deleteImage(formData.id, auth.token.access_token)
        .then(() => setFormData((prev) => ({ ...prev, id: 0 })))
        .catch(err => {
          if (err.response.status === 401) {
            setTokenData({ access_token: '', refresh_token: '' })
            setAuthError(true)
          }
        })
    }
    uploadImage(file, auth.token.access_token)
      .then(res => {
        setFormData((prev) => ({ ...prev, id: res }))
        onSuccess(res, {} as XMLHttpRequest)
      })
      .catch(err => {
        onError(err)
        return err.response.status
      })
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  return (
    <Form
      name='normal_login'
      className='login-form'
      onFinish={onFinish}
    >
      <Form.Item
        name='name'
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Name'
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        />
      </Form.Item>
      <Form.Item
        name='description'
        rules={[{ required: true, message: 'Please input your Description!' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Description'
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </Form.Item>
      <Form.Item
        name='upload'
        label='Upload'
        valuePropName='fileList'
        getValueFromEvent={normFile}
        rules={[{ required: true, message: 'Please upload image' }]}
      >
        <Upload
          name='logo'
          listType='picture'
          maxCount={1}
          onPreview={() => false}
          accept='.jpg,.jpeg,.bmp,.png'
          customRequest={async ({ onSuccess, onError, file }) => await customRequestHandler(onSuccess!, onError!, file)}
          onRemove={() => {
            deleteImage(formData.id, auth.token.access_token)
              .then(() => setFormData((prev) => ({ ...prev, id: 0 })))
              .catch(err => {
                if (err.response.status === 401) {
                  setTokenData({ access_token: '', refresh_token: '' })
                  setAuthError(true)
                }
              })
          }}
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='login-form-button'
          loading={confirmLoading}
        >
          Log in
        </Button>
        {authError ? <span> Вы не авторизованны </span> : null}
      </Form.Item>
    </Form>
  )
}

export default React.memo(UploadForm)
