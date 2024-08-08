
export default defineEventHandler(async (event) => {
  return await chef.get("/api/tags")
});
