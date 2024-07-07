# Chef Nuxt/Bun

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
bun run dev
```

## Production

Build the application for production:

```bash
docker build .
```

### Environment variables

```bash
# backend base url
API_URL=http://localhost:8000
# assets storage url
IMAGES_URL=http://localhost:8000/images
# key for JWT signing
SECRET_KEY=lkiawdlajdlandkauboqih2oahao2ahka2
# admin username/password
MASTER_USERNAME=chef
MASTER_PASSWORD=chef
```

Locally preview production build:

```bash
bun run preview
```
