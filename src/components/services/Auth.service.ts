import axios, { AxiosResponse } from 'axios'
import { AUTH_URL, BASIC_CLIENT_ID, BASIC_CLIENT_SECRET } from '@config'
import { IToken, IFormLogin } from '@interface'
import btoa from 'btoa'
import { stringify } from 'qs'

const client = axios.create({
  timeout: 5000,
  baseURL: AUTH_URL,
  headers: {
    Accept: 'application/json; charset=utf-8',
    Authorization: `Basic ${btoa(`${BASIC_CLIENT_ID}:${BASIC_CLIENT_SECRET}`)}`,
  },
  withCredentials: true,
})

export async function getAuth(formData: IFormLogin): Promise<IToken> {
  const res: AxiosResponse = await client.post(
    '',
    stringify({ ...formData, grant_type: 'password' })
  )
  return res.data
}

export async function getRefresh(refresh_token: string): Promise<IToken> {
  const res: AxiosResponse = await client.post(
    '',
    stringify({ refresh_token, grant_type: 'refresh_token' })
  )
  return res.data
}
