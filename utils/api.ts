import { ofetch } from 'ofetch'
import type { FetchOptions } from 'ofetch'

export async function wrappedFetch<T>(url: string, options?: FetchOptions): Promise<T> {

  const { addNotification } = useNotifications();

  const customFetch = ofetch.create({})
  try {
    return await customFetch(url, { ...options })
  } catch (err: unknown) {
    addNotification({
      level: "error",
      title: "Network Error",
      text: `${err}` ?? "Something wrong happened",
    }, 3000)
    throw err;
  }

}
