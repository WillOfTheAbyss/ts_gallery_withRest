import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { RegData } from '../../Interfaces/Interfaces'
import React from 'react'

interface RegFormProps {
  formData: RegData
  confirmLoading: boolean
  error: boolean
  setFormData: (data: (prev: RegData) => RegData) => void
  onFinish: (values: RegData) => void
}

const RegForm: React.FC<RegFormProps> = ({ formData, setFormData, onFinish, confirmLoading, error }) => {
  return (
    <Form
      name='normal_login'
      className='login-form'
      onFinish={onFinish}
    >
      <Form.Item
        name='username'
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Username'
          value={formData.userName}
          onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
        />
      </Form.Item>
      <Form.Item
        name='email'
        rules={[{ required: true, message: 'Please input your E-mail!' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='example@mail.ru'
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        />
      </Form.Item>
      <Form.Item
        name='fullName'
        rules={[{ required: true, message: 'Please input your Name!' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Name'
          value={formData.fullName}
          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
        />
      </Form.Item>
      <Form.Item
        name='phone'
        rules={[{ required: true, message: 'Please input your Phone!' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Phone'
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
        />
      </Form.Item>

      {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item> */}

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='login-form-button'
          loading={confirmLoading}
        >
          Log in
        </Button>
        {error ? <span style={{ color: 'red' }}> Пользователь с такими данными уже сущестует</span> : null}
      </Form.Item>
    </Form>
  )
}

export default React.memo(RegForm)
