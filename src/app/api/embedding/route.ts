import { NextResponse } from "next/server";
import { TokenTextSplitter } from "langchain/text_splitter";
import { createClient } from 'redis'
import { MongoDBAtlasVectorSearch } from "langchain/vectorstores/mongodb_atlas";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Document } from "langchain/document";
import { MongoClient } from "mongodb";

export async function POST(request: Request) {
  const { text } = await request.json()
  
  const splitter = new TokenTextSplitter({
    encodingName: 'gpt2',
    chunkSize: 600,
    chunkOverlap: 60
  })
  
  const texts = await splitter.splitText(text)
  
  const docs: Document[] = []

  for await(const text of texts) {
    const doc = new Document({
      metadata: {
        topic: "about",
      },
      pageContent: text
    })

    docs.push(doc)
  }

  const redis = createClient({
    url: process.env.REDIS_URL,
  })

  await redis.connect()

  await RedisVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({ openAIApiKey: process.env.OPEN_AI_KEY }),
    {
      indexName: "about",
      redisClient: redis,
      keyPrefix: "about:"
    }
  )

  await redis.disconnect()

  return NextResponse.json({ docs })

}
