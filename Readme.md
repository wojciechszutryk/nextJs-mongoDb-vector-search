## Intro

Repo based on the following articles from:

- [mongodb.com] (https://www.mongodb.com/developer/languages/javascript/nextjs-with-mongodb/)
- [mongodb.com] {https://www.mongodb.com/developer/products/atlas/semantic-search-mongodb-atlas-vector-search/}

If you want to learn more about MongoDB, visit the following pages:

- [MongoDB Atlas](https://mongodb.com/atlas)
- [MongoDB Documentation](https://docs.mongodb.com/)

## How to use

```bash
npx create-next-app --example with-mongodb with-mongodb-app
```

## Configuration

### Set up a MongoDB database

Set up a MongoDB database either locally or with [MongoDB Atlas for free](https://mongodb.com/atlas).

### Set up environment variables

Copy the `env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster.

### Run Next.js in development mode

```bash
npm install
npm run dev

Your app should be up and running on [http://localhost:3000](http://localhost:3000)!
```
