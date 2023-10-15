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
import { Button } from '../Button'

export function DownloadList() {
  const {videos, addVideo, addAudio, } = useStore()

  async function handleStartAudioExtraction() {
    if(!videos.length) return

    videos.map(video => {
      addAudio({
        id: crypto.randomUUID(),
        title: video.title,
        fromVideo: video,
        isExtracting: false,
        extracted: false,
        isTranscribing: false,
        transcribed: false,
        playable: false,
        isLoading: false,
        isFetchingUrl: false,
      })
    })
  }

  return (
    <div className="w-full max-w-lg mt-4">
      <Card>
        <CardHeader>
          <CardTitle>
            Videos to Download
          </CardTitle>
          <CardDescription>Paste your Youtube video ID here</CardDescription>
        </CardHeader>
        <CardContent>
          <VideoForm />
          <ScrollArea className="h-screen max-h-[680px] mt-4">
            <div className="flex flex-col gap-2">
              { videos.map((video) => {
                return (
                  <VideoPlayer key={video.id} videoId={video.id} />
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className='justify-end'>
        <Button onClick={handleStartAudioExtraction}>Start Audio Extraction</Button>
        </CardFooter>
      </Card>
      
    </div>
  )

}