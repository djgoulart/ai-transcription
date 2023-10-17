import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import chalk from "chalk";
import { r2 } from "@/lib/r2";
import FormData from 'form-data'
import axios from 'axios'
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    fileName,
  } = await request.json()

  try {

    const videoAudio = await r2.send(
      new GetObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
        Key: fileName,
      }),
    )

    const formData = new FormData()

    formData.append('file', videoAudio.Body, {
      contentType: videoAudio.ContentType,
      knownLength: videoAudio.ContentLength,
      filename: fileName,
    })

    formData.append('model', 'whisper-1')
    formData.append('language', 'pt')

    const response = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          ...formData.getHeaders(),
        },
      },
    )

    await r2.send(
      new DeleteObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
        Key: fileName,
      }),
    )

    const transcriptionKey = `${fileName}.txt`

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
        Key: transcriptionKey,
        Body: response.data.text,
      }),
    )

    const { text } = response.data
    return NextResponse.json({ transcription: text })

  } catch (error) {
    console.log(chalk.red(`error generating transcription: ${error}`))
  }
}