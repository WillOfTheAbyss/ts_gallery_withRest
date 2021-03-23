export interface Image {
  id: number
  name: string
}

export interface IPhotosData {
  id: number
  name: string
  dateCreate: string
  description: string
  new: boolean
  popular: boolean
  image: Image
  user: string | null
}

export interface IPhotos {
  totalItems: number
  itemsPerPage: number
  countOfPages: number
  data: IPhotosData[]
}

export interface IClientResponse {
  id: number
  randomId: string
  secret: string
}

export interface IToken {
  access_token: string
  refresh_token: string
}

export interface AuthData {
  userName: string
  password: string
}

export interface RegData {
  userName: string
  email: string
  fullName: string
  phone: string
  password: string
}

export interface UploadData {
  name: string
  description: string
  id: number
}

export interface IRegistration {
  username: string
  email: string
  fullName: string
  phone: string
}
