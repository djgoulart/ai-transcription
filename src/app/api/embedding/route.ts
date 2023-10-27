import { NextResponse } from "next/server";
import { TokenTextSplitter } from "langchain/text_splitter";
import { createClient } from 'redis'
import { RedisVectorStore } from "langchain/vectorstores/redis";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Document } from "langchain/document";

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
    url: 'redis://127.0.0.1:6379',
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
