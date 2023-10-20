'use client'

import { Transcription } from "@/models"
import { useStore } from "@/store"
import React, { useEffect, useMemo } from "react"
import { Skeleton } from "../Skeleton"
import { useTranscription } from "@/hooks/useTranscription"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../Button"
import { ScrollArea } from "../ScrollArea"

export interface TranscriptionItemProps {
  textId: string
}

export function TranscriptionItem(props: TranscriptionItemProps) {
  const { textId } = props
  const { transcriptions, markAsLoading, markAsTranscribing, unmarkAsLoading, markAsTranscribed } = useStore()
  const { fetchTranscription } = useTranscription()
  const [stored, setValue] = useLocalStorage(`vitai::transcription::${textId}`, '')

  const transcription = useMemo(() => {
    return transcriptions.find(item => item.id === textId)
  }, [transcriptions])

  useEffect(() => {
    if (transcription && !transcription.transcribed) {
      markAsLoading(transcription.id)
      markAsTranscribing(transcription.id)

      fetchTranscription(transcription.name!)
        .then((response) => {
          markAsTranscribed(transcription.id, response.transcription)
        })
        .catch((error) => console.log('audio download error', error))
        .finally(() => {
          unmarkAsLoading(transcription.id)
        })
    }
  }, [])

  useEffect(() => {
    if (transcription?.transcribed) {
      setValue(JSON.stringify(transcription))
    }
  }, [transcription])

  if (transcription && transcription.isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-[53px] w-[120px] rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    )
  }

  if (transcription && transcription.isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-[53px] w-[120px] rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    )
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex flex-row gap-2 w-full font-light text-sm bg-muted rounded-md">
          <div className="flex items-center w-full h-[53px] overflow-hidden p-2">
            <h3 className="text-ellipsis line-clamp-1 text-xs font-medium">
              {transcription?.title}
            </h3>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-ellipsis line-clamp-1">{transcription?.title}</DialogTitle>
          <DialogDescription>
            <ScrollArea className="h-[600px] pt-2">
            {transcription?.text}
            </ScrollArea>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>



  )
}