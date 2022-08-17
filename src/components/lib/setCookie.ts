import { NextPageContext, GetServerSidePropsContext } from 'next'
import { setCookie, parseCookies } from 'nookies'
import { IToken } from '@interface'
import { AUTH_TOKEN, AUTH_TOKEN_TYPE, AUTH_REFRESH_TOKEN } from '@config'

export function setAuthCookies({
  ctx,
  token_type,
  refresh_token,
  access_token,
}: IToken) {
  const maxAge = 7200
  const tokenMaxAge = 600

  setCookie(ctx, AUTH_TOKEN_TYPE, token_type, {
    maxAge,
    path: '/',
  })

  setCookie(ctx, AUTH_REFRESH_TOKEN, refresh_token, {
    maxAge,
    path: '/',
  })

  setCookie(ctx, AUTH_TOKEN, access_token, {
    maxAge: tokenMaxAge,
    path: '/',
  })
}

export function getRefreshCookie(
  ctx: NextPageContext | GetServerSidePropsContext | undefined
) {
  const cookies = parseCookies(ctx)
  const refresh_token = cookies[AUTH_REFRESH_TOKEN]

  return refresh_token
}
