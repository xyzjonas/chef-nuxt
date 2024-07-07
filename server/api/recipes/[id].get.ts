import { useError } from "nuxt/app"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  try {
    return await chef.get(`/api/recipes/${id}`)
  } catch(err: unknown) {
    setResponseStatus(event, (err as { statusCode: number }).statusCode)
    throw err;
  }
})