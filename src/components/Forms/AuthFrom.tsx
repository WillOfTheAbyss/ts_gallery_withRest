import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { AuthData } from '../../Interfaces/Interfaces'
import React from 'react'

interface AuthFormProps {
  formData: AuthData
  setFormData: (data: (prev: AuthData) => AuthData) => void
  confirmLoading: boolean
  onFinish: (values: AuthData) => void
  error: boolean
}

const AuthForm: React.FC<AuthFormProps> = ({ formData, setFormData, onFinish, confirmLoading, error }) => {
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
        {error ? <span style={{ color: 'red' }}> Неверный логин или пароль</span> : null}
      </Form.Item>
    </Form>
  )
}

export default React.memo(AuthForm)
