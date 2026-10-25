export type User = {
    name: string
    avatarUrl: string
  }
export type ApiUser = {
  id: number
  email: string
  username: string
  password: string
  name: { firstname: string; lastname: string }
  phone: string
}

export type UserInput = Omit<ApiUser, 'id'>
