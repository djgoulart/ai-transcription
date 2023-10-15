import { r2 } from '@/lib/r2'
import chalk from 'chalk'
import { NextResponse } from 'next/server'
import ytdl from 'ytdl-core'
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


    return NextResponse.json(result)
  } catch (err) {
    console.log('error')
  }
}
