'use client'

import React, { useEffect }  from 'react'

import { ScrollArea } from '../ScrollArea'
import { useStore } from '@/store'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AudioItem } from '../AudioItem'
import { Button } from '../Button'

export function AudioList() {
  const {audios, addTranscription} = useStore()

  async function handleStartTranscription() {
    if(!audios.length) return

    audios.map(audio => {
      const id = crypto.randomUUID()

      addTranscription({
        id,
        title: audio.title,
        name: audio.name,
        text: '',
        isLoading: false,
        isTranscribing: false,
        transcribed: false,
        embed: false
      })
    })
  }
  return (
    <div className="w-full max-w-lg mt-4">
      <Card>
        <CardHeader>
          <CardTitle>
            Audios Extracted
          </CardTitle>
          <CardDescription>List of audios ready to transcript</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-screen max-h-[720px] mt-4">
            <div className="flex flex-col gap-2">
              { audios.map((audio) => {
                return (
                  <AudioItem key={audio.id} data={audio} />
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className='justify-end'>
          <Button onClick={handleStartTranscription}>Start Transcription</Button>
        </CardFooter>
      </Card>
    </div>
  )

}