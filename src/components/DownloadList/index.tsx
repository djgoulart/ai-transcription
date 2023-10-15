'use client'

import React, { useEffect } from 'react'

import { VideoPlayer } from '../VideoPlayer'
import { ScrollArea } from '../ScrollArea'
import { VideoForm } from './VideoForm'
import { useStore } from '@/store'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function DownloadList() {
  const {videos} = useStore()

  useEffect(() => console.log('videos', videos), [videos])

  return (
    <div className="w-full max-w-lg mt-4">
      <Card>
        <CardHeader>
          <CardTitle>
            Videos to Download
          </CardTitle>
          <CardDescription>Paste your Youtube video ID here</CardDescription>
        <VideoForm />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-screen max-h-[700px]">
            <div className="flex flex-col gap-2">
              { videos.map((video) => {
                return (
                  <VideoPlayer key={video.id} videoId={video.id} />
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
      
    </div>
  )

}