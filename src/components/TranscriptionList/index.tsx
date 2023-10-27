'use client'

import React from 'react'
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

import { Button } from '../Button'
import { TranscriptionItem } from '../TranscriptionItem'
import { useEmbedding } from '@/hooks/useEmbedding'

export function TranscriptionList() {
  const {transcriptions,  } = useStore()
  const { createEmbedding } = useEmbedding()
  
  const handleEmbedTranscriptions = async () => {
    for await (const transcription of transcriptions) {
      await createEmbedding(transcription.text)

    }
  }

  return (
    <div className="w-full max-w-lg mt-4">
      <Card>
        <CardHeader>
          <CardTitle>
            Transcriptions
          </CardTitle>
          <CardDescription>List of Transcriptions ready to ingest</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-screen max-h-[720px] mt-4">
            <div className="flex flex-col gap-2">
              { transcriptions.map((transcription) => {
                return (
                  <TranscriptionItem key={transcription.id} textId={transcription.id} />
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className='justify-end'>
          <Button onClick={handleEmbedTranscriptions}>Start AI Ingestion</Button>
        </CardFooter>
      </Card>
    </div>
  )

}