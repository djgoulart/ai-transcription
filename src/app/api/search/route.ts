import { NextResponse } from "next/server";
import { createClient } from 'redis'
import { RedisVectorStore } from "langchain/vectorstores/redis";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { RetrievalQAChain } from "langchain/chains"
import { PromptTemplate } from "langchain/prompts";

export async function POST(request: Request) {
  const { question } = await request.json()

  const redis = createClient({
    url: process.env.REDIS_URL
  })

  redis.on("error", function(err) {
    throw err;
  });

  await redis.connect()

  const vectorStore = new RedisVectorStore(new OpenAIEmbeddings({ openAIApiKey: process.env.OPEN_AI_KEY }), {
    redisClient: redis,
    indexName: "about",
  });

  const openAiChat = new ChatOpenAI({
    openAIApiKey: process.env.OPEN_AI_KEY,
    modelName: 'gpt-4',
    temperature: 0.3
  })

  const prompt = new PromptTemplate({
    template: `Você é um especialista em vendas e atendimento ao cliente que 
    e você faz parte da equipe de uma empresa que vende um curso sobre o mercado
    financeiro. 
    Você está ajudando seu time de vendas respondendo as duvidas de pessoas interessadas em adquirir 
    o produto da empresa. 
    
    Você responde as duvidas de forma objetiva e clara baseando-se na documentação fornecida pela empresa.

    Use uma linguagem acessível mesmo para as pessoas leigas, sem conhecimento sobre o mercado financeiro.
    
    Se necessário organize sua resposta em pequenos tópicos para facilitar o entendimento.
    
    Tente não ser repetitivo, pense bastante ao formular sua resposta.

    Não utilize palavras como "De acordo com a documentação fornecida". Sua resposta deve ser semelhante a resposta
    de uma pessoa e o mais humanizada possível.

    Sua resposta deve incentivar usuário a aderir ao curso ao final da resposta.

    Caso não encontre a resposta na documentação fornecida, você gentilmente diz que não sabe.
    
    A pergunta do cliente é: {query}

    A documentação onde com a possível resposta: {context}
    `.trim(),
    inputVariables: ['query', 'context']
  });

  const chain = RetrievalQAChain.fromLLM(openAiChat, vectorStore.asRetriever(5, ['about']), {
    prompt,
    returnSourceDocuments: false,
    verbose: false
  })

  const response = await chain.call({ query: question })

  await redis.disconnect()

  return NextResponse.json(response)
}