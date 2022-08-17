import { GetServerSidePropsContext } from 'next'
import Router from 'next/router'
import { GraphQLClient } from 'graphql-request'
import { GraphQLResponse, Variables } from 'graphql-request/dist/types'
import nookies, { parseCookies } from 'nookies'
import { setAuthCookies } from '@lib/setCookie'
import { getRefresh } from '@services/ApiService'
import absoluteUrl from 'next-absolute-url'
import {
  GRAPHQL_URL,
  AUTH_TOKEN,
  AUTH_TOKEN_TYPE,
  AUTH_REFRESH_TOKEN,
} from '@config'
import { getProjectIdFromPath } from './common.util'

let cookies = parseCookies()
let isRefreshing = false
const failedRequestsQueue: any[] = []
const isClient = process.browser

interface IGraphqlClient {
  ctx?: GetServerSidePropsContext
  query: string
  variables?: Variables
}

export const client = new GraphQLClient('', {
  headers: {
    Authorization: `${cookies[AUTH_TOKEN_TYPE]} ${cookies[AUTH_TOKEN]}`,
  },
})

export async function graphqlClient(props: IGraphqlClient): Promise<any> {
  const { ctx, query, variables } = props
  const { protocol } = absoluteUrl(ctx?.req)

  client.setEndpoint(ctx ? `${protocol}${GRAPHQL_URL}` : GRAPHQL_URL)
  cookies = parseCookies(ctx)
  const projectID =
    typeof window !== 'undefined'
      ? getProjectIdFromPath(window.location.pathname)
      : ctx?.query?.projectId?.toString() ?? ''

  if (isClient) {
    client.setHeaders({
      Authorization: `${cookies[AUTH_TOKEN_TYPE]} ${cookies[AUTH_TOKEN]}`,
      'X-Project-Id': projectID,
    })
  }

  return await client
    .request(query, variables)
    .then((data: GraphQLResponse) => {
      return data
    })
    .catch(({ response }) => {
      const { errors } = response
      // UNAUTHENTICATED ERROR
      if (errors?.length && errors[0].extensions.code === 'UNAUTHENTICATED') {
        cookies = parseCookies(ctx)
        if (!isRefreshing) {
          isRefreshing = true

          getRefresh(cookies[AUTH_REFRESH_TOKEN])
            .then((data) => {
              const { access_token, refresh_token, token_type } = data
              setAuthCookies({ ctx, access_token, refresh_token, token_type })

              client.setHeaders({
                Authorization: `${token_type} ${access_token}`,
                'X-Project-Id': projectID,
              })

              failedRequestsQueue.forEach((request) =>
                request.onSuccess(token_type, access_token)
              )
              failedRequestsQueue.length = 0
            })
            .catch((err) => {
              failedRequestsQueue.forEach((request) => request.onFailure(err))
              failedRequestsQueue.length = 0
            })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token_type: string, access_token: string) => {
              client.setHeaders({
                Authorization: `${token_type} ${access_token}`,
                'X-Project-Id': projectID,
              })
              resolve(client.request(query, variables))
            },
            onFailure: (data: any) => {
              if (isClient) {
                Router.push('/login')
              } else {
                nookies.destroy(ctx, AUTH_TOKEN_TYPE, { path: '/' })
                nookies.destroy(ctx, AUTH_TOKEN, { path: '/' })
                nookies.destroy(ctx, AUTH_REFRESH_TOKEN, { path: '/' })
                reject(data)
              }
            },
          })
        })
      } else {
        return Promise.reject(response)
      }
    })
}
