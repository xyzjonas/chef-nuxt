import { useError } from "nuxt/app"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  // console.info(event.node.req.body)
  const body = await readBody(event)

  try {
    return await chef.put(`/api/recipes/${id}`, body)
  } catch(err: unknown) {
    setResponseStatus(event, (err as { statusCode: number }).statusCode)
    throw err;
  }
})