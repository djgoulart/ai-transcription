'use client'
import React, { useEffect, useMemo } from 'react'
import Image from 'next/image'
import { Audio } from '@/models'
import { useVideo } from '@/hooks/useVideo'
import { useStore } from '@/store/index'
import { useAudio } from '@/hooks/useAudio'
import { Skeleton } from '../Skeleton'

export interface AudioItemProps {
  data: Audio
}

export function AudioItem(props: AudioItemProps) {
  const { data } = props
  const { extractAndUploadAudioFile } = useVideo()
  const { fetchAudio } = useAudio()
  const {
    audios,
    markAudioAsExtracting,
    markAudioAsExtracted,
    markAudioAsLoading,
    unmarkAudioAsLoading,
    addFileName,
    addFileUrl,
    markAudioAsPlayable,
    removeVideo } = useStore()

  const audio = useMemo(() => {
    return audios.find(item => item.id === data.id)
  }, [audios])

  useEffect(() => {
    if (audio && !audio.extracted) {
      markAudioAsLoading(audio.id)
      markAudioAsExtracting(audio.id)

      extractAndUploadAudioFile(data.fromVideo.id)
        .then((response) => {
          if (response.$metadata.httpStatusCode === 200) {
            addFileName(audio.id, response.Key)
            markAudioAsExtracted(audio.id)
            removeVideo(audio.fromVideo.id)
          }
        })
        .catch((error) => console.log('audio download error', error))
        .finally(() => {
          unmarkAudioAsLoading(audio.id)
        })
    }
  }, [])

  useEffect(() => {
    if (audio && audio.extracted && audio.name && !audio.playable) {
      markAudioAsLoading(audio.id)

      fetchAudio(audio.name)
        .then((result) => {
          addFileUrl(audio.id, result)
        })
        .catch((error) => {
          console.log('error trying to get audio url', error)
        })
        .finally(() => {
          markAudioAsPlayable(audio.id)
          unmarkAudioAsLoading(audio.id)
        })
    }
  }, [audio!.name])


  if (audio && audio.isLoading) {
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
    <div className="flex flex-col gap-2 w-full font-light text-sm rounded-[2px]">
      <div className="w-full overflow-hidden py-1">
        <h3 className="text-ellipsis line-clamp-1 text-xs font-medium">
          {audio?.title}
        </h3>
      </div>
      <div className='flex flex-row items-center gap-2'>
        <div className='w-[120px]'>
          <Image
            className="aspect-video w-full rounded-md border border-solid border-purple-700"
            src={audio!.fromVideo.thumbnails!.medium.url || ''}
            width={audio!.fromVideo.thumbnails!.medium.width}
            height={audio!.fromVideo.thumbnails!.medium.height}
            alt='Thumbnail' />
        </div>
        <div className="w-full">
          {
            audio!.url && audio?.playable && (
              <audio controls>
                <source src={audio.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) 
          }
        </div>
      </div>
    </div>
  )
}