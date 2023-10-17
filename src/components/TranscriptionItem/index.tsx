'use client'

import { Transcription } from "@/models"
import { useStore } from "@/store"
import React, { useEffect, useMemo } from "react"
import { Skeleton } from "../Skeleton"
import { useTranscription } from "@/hooks/useTranscription"

export interface TranscriptionItemProps {
  textId: string
}

export function TranscriptionItem(props: TranscriptionItemProps){
  const {textId} = props
  const {transcriptions, markAsLoading, markAsTranscribing, unmarkAsLoading, markAsTranscribed} = useStore()
  const {fetchTranscription} = useTranscription()

  const transcription = useMemo(() => {
    return transcriptions.find(item => item.id === textId)
  }, [transcriptions])

  useEffect(() => {
    if(transcription && !transcription.transcribed) {
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
    <div className="flex flex-col gap-2 w-full font-light text-sm bg-muted rounded-md">
      <div className="flex items-center w-full h-[53px] overflow-hidden p-2">
        <h3 className="text-ellipsis line-clamp-1 text-xs font-medium">
          {transcription?.title}
        </h3>
      </div>
    </div>
  )
}