# install dependencies into temp directory
# this will cache them and speed up future builds
FROM oven/bun:1 AS build

WORKDIR /build

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .

ENV NODE_ENV=production
RUN bun run build

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM oven/bun:1
COPY --from=build /build/.output .
COPY --from=build /temp/prod/node_modules node_modules
# COPY --from=prerelease /usr/src/app/index.ts .
# COPY --from=prerelease /usr/src/app/package.json .

# run the app
USER bun
EXPOSE 3000/tcp
CMD [ "bun", "run", "./server/index.mjs" ]