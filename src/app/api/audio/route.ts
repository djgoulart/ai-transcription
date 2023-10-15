import { NextResponse } from 'next/server'
import {
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { r2 } from '@/lib/r2'

export async function POST(request: Request) {
  const { audioKey } = await request.json()

  /* const audio = await r2.send(
    new GetObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      Key: audioKey,
    }),
  ) */
  const signedUrl = await getSignedUrl(
    r2,
    new GetObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      Key: audioKey,
    }),
    { expiresIn: 1800 },
  )

  return NextResponse.json(signedUrl)

}