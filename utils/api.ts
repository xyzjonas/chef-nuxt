import { ofetch } from 'ofetch'
import type { FetchOptions } from 'ofetch'

interface MyFetchOptions extends FetchOptions {
  skipNotification?: boolean;
  customNotification?: AddNotification;
}

export async function wrappedFetch<T>(url: string, options?: MyFetchOptions): Promise<T> {

  const { addNotification } = useNotifications();

  const customFetch = ofetch.create({})
  try {
    return await customFetch(url, { ...options })
  } catch (err: unknown) {
    if (options?.skipNotification) {}
    else if (options && options.customNotification) {
      addNotification(options.customNotification, 3000)
    } else {
      addNotification({
        level: "error",
        title: "Network Error",
        text: `${err}` ?? "Something wrong happened",
      }, 3000)
    }
    throw err;
  }

}
