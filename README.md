# Mongo db pagination and search demo

We need a mongo db with a collection named `Movie`, that contains documents with the following keys:

```ts
  _id: string
  title: string
  releaseDate: string
  overview: string
  posterPath: string
```

We created that in the project `next-prisma-seed`.

We also need an Atlas Search index named `search` that we can create with the Atlas UI, as explained [here](https://www.mongodb.com/docs/atlas/atlas-search/create-index/#create-an-fts-index-using-the-service-ui).  
Note that we can only create 3 indexes in the free tier.

## This project is part of 3 related projects

1. `next-prisma-seed`: we used prisma to seed a mongodb database with movies.
2. `mongo-pagination-search`: we used this project to paginate and search movies from the mongodb database.
3. `infinite-scrolling`: we removed pagination an implemented infinite scrolling with server actions.
