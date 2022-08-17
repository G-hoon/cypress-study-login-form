import axios, { AxiosResponse } from 'axios'
import { IPerson, IToken, IFormLogin } from '@interface'
import btoa from 'btoa'
import { stringify } from 'qs'

// config
const BASIC_CLIENT_ID = process.env.NEXT_PUBLIC_BASIC_CLIENT_ID
const BASIC_CLIENT_SECRET = process.env.NEXT_PUBLIC_BASIC_CLIENT_SECRET
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const axiosConfig = {
  headers: {
    Accept: 'application/json; charset=utf-8',
    Authorization: `Basic ${btoa(`${BASIC_CLIENT_ID}:${BASIC_CLIENT_SECRET}`)}`,
  },
  withCredentials: true,
}

export async function getAuth(formData: IFormLogin): Promise<IToken> {
  const res: AxiosResponse = await axios.post(
    `${BASE_URL}/apis/oauth2/token`,
    stringify({ ...formData, grant_type: 'password' }),
    axiosConfig
  )
  return res.data
}

export async function getRefresh(refresh_token: string): Promise<IToken> {
  const res: AxiosResponse = await axios.post(
    `${BASE_URL}/apis/oauth2/token`,
    stringify({ refresh_token, grant_type: 'refresh_token' }),
    axiosConfig
  )
  return res.data
}

export async function getPerson(): Promise<IPerson> {
  const res: AxiosResponse = await axios.get(`${BASE_URL}/api/example/person`)
  return res.data
}
