import { Collection, Db, Document, MongoClient } from 'mongodb'
import clientPromise from './client'

type Movie = {
  _id: string
  title: string
  releaseDate: string
  overview: string
  posterPath: string
}


let client: MongoClient
let db: Db
let movies: Collection<Document>


async function init() {
  if (db) return
  try {
    client = await clientPromise
    db = client.db()
    movies = db.collection('Movie')
  } catch (error) {
    throw new Error('Failed to connect to the database.')
  }
}

;(async () => {
  await init()
})()

/// Movies ///

export const getMovies = async ({
  query,
  page = 1,
  limit = 10
}: {
  query?: string
  page: number
  limit: number
}) => {
  try {
    if (!movies) await init()

    const skip = (page - 1) * limit

    const pipeline: PipelineStage[] = [{ $skip: skip }, { $limit: limit }]

    if (query) {
      pipeline.unshift({
        $search: {
          index: 'search',
          text: {
            query,
            fuzzy: {
              maxEdits: 1,
              prefixLength: 3,
              maxExpansions: 50
            },
            path: {
              wildcard: '*'
            }
          }
        }
      })
    }

    const result = await movies.aggregate(pipeline).toArray()

    return { movies: result as Movie[]}
  } catch (error) {
    return { error }
  }
}

type PipelineStage =
  | {
      $search: {
        index: string
        text: {
          query: string
          fuzzy: {}
          path: {
            wildcard: string
          }
        }
      }
    }
  | {
      $skip: number
    }
  | {
      $limit: number
    }
