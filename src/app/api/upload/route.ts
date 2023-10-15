import { r2 } from '@/lib/r2'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl, } from '@aws-sdk/s3-request-presigner'
import chalk from 'chalk'
import { NextResponse } from 'next/server'
import ytdl from 'ytdl-core'
import fs, { ReadStream } from 'node:fs'
import * as stream from 'stream'
import {Upload} from '@aws-sdk/lib-storage'

export async function POST(request: Request) {
  const { videoId } = await request.json()

  try {
    const videoObject = ytdl(`https://youtube.com/watch?v=${videoId}`, {
      quality: 'lowestaudio',
      filter: 'audioonly'
    })
    .on('error', () => console.log(chalk.red('video download error')))

    const uploadStream = new stream.PassThrough();

    
    const result = await new Upload({params: {
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      Key: `${videoId}.mp4`,
      Body: videoObject.pipe(uploadStream)
    }, client: r2}).done()

    

   /*  videoObject.pipe(uploadStream)

    const uploadResult = await fetch(signedUrl, {
      method: 'PUT',
      body: uploadStream.pipe()
    }) */

    //console.log(chalk.yellow(`Upload Status: ${uploadResult.status}`))

    /* console.log(chalk.yellow(`Generating an upload URL: ${videoId}`))

    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
        Key: `${videoId}.mp4`,
      }),
      { expiresIn: 60 },
    )

    console.log(chalk.green(`Success generating upload URL!`))

    const response = NextResponse.json({ url: signedUrl })
    console.log(chalk.yellow(`returning response`, response)) */
    return NextResponse.json(result)
  } catch (err) {
    console.log('error')
  }
}
