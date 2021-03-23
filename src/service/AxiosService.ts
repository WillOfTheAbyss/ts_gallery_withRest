import { RcFile } from 'antd/lib/upload'
import axios from 'axios'
import { IPhotos, IClientResponse, AuthData, IToken, RegData, IRegistration, UploadData } from '../Interfaces/Interfaces'

export const getPhotos = async (
  page: number,
  sort: string
): Promise<IPhotos> => {
  return await axios
    .get(`/api/photos?${sort}=true&page=${page}&limit=15`)
    .then((res) => res.data)
}

export const createClient = async (): Promise<IClientResponse> => {
  return await axios
    .post('/api/clients', {
      name: `${Date.now()}`,
      allowedGrantTypes: ['password', 'refresh_token']
    })
    .then((res) => res.data)
    .then(res => ({
      id: res.id,
      randomId: res.randomId,
      secret: res.secret
    }))
}

export const userAuth = async (data: AuthData | RegData, clientData: IClientResponse): Promise<IToken> => {
  const formData = new FormData()
  formData.append('client_id', `${clientData.id}_${clientData.randomId}`)
  formData.append('grant_type', 'password')
  formData.append('password', data.password)
  formData.append('username', data.userName)
  formData.append('client_secret', clientData.secret)

  return await axios.post('/oauth/v2/token',
    formData,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => res.data)
    .then(res => ({
      access_token: res.access_token,
      refresh_token: res.refresh_token
    }))
}
// я не придумал, где рефреш токена использовать, как я понял рефреш токен живет столько же сколько и access
// const tokenRefresh = async (clientData: IClientResponse, refreshToken: string): Promise<IToken> => {
//   const formData = new FormData()
//   formData.append('client_id', `${clientData.id}_${clientData.randomId}`)
//   formData.append('grant_type', 'refresh_token')
//   formData.append('refresh_token', refreshToken)
//   formData.append('client_secret', clientData.secret)

//   return await axios.post('/oauth/v2/token',
//     formData,
//     {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     }).then(res => res.data)
//     .then(res => ({
//       access_token: res.access_token,
//       refresh_token: res.refresh_token
//     }))
// }

export const userRegistration = async (data: RegData): Promise<IRegistration> => {
  return await axios.post('/api/users', {
    email: data.email,
    phone: data.phone,
    fullName: data.fullName,
    password: data.password,
    username: data.userName,
    birthday: null,
    roles: ['ROLE_USER']
  }).then(res => res.data)
    .then(res => ({
      username: res.username,
      email: res.email,
      fullName: res.fullName,
      phone: res.phone
    }))
}

export const uploadImage = async (file: string | RcFile | Blob, token: string): Promise<number> => {
  const formData = new FormData()
  formData.append('file', file)

  return await axios
    .post('/api/media_objects', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
    .then((res) => res.data.id)
}

export const deleteImage = async (id: number, token: string): Promise<number> => {
  return await axios.delete(`/api/media_objects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  }).then(res =>  res.status)
}

export const postPhoto = async (data: UploadData, token: string): Promise<any> => {
  return await axios.post('/api/photos', {
    name: data.name,
    description: data.description,
    new: true,
    popular: false,
    image: `/api/media_objects/${data.id}`
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-type': 'application/json'
    }
  })
}
