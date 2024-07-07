import type { FetchError } from 'ofetch'

export function handleErrorRedirect(error?: FetchError<any>) {
  if (error?.statusCode === 404) {
    navigateTo("/error/404")
  } else if (error?.statusCode === 503) {
    navigateTo("/error/503")
  } else {
    navigateTo("/error/500")
  }
}