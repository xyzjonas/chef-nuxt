
export default defineEventHandler(async (event) => {

  const {username, password } = await readBody(event)

  if (!validatePassword(username, password)) {
    setResponseStatus(event, 401);
    return { reason: "invalid username or password" };
  }

  // todo: sessions in database
  const token = encodeSession({
    id: 1,
    username: username,
  });

  return { token: token };
});
