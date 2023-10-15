'use client'
import React, { useEffect, ComponentProps, useMemo, useState } from 'react'
import Image from 'next/image';
import { Skeleton } from '../Skeleton'
import { useStore } from '@/store';

export interface VideoPlayerProps extends ComponentProps<'div'> {
  videoId: string
}

export function VideoPlayer(props: VideoPlayerProps) {
  const {videoId} = props
  const {videos } = useStore()

  const video = useMemo(() => {
    return videos.find(item => item.id === videoId)
  }, [videos])

  useEffect(() => console.log('VIDEO_CHANGED', video), [video])

  if(video?.isRequestingInfo || !video) {
    return <Skeleton className='w-full h-[52px]' />
  }

  return (
    <div className="flex gap-2 w-full font-light text-sm bg-muted rounded-[2px]">
      <div className="relative w-[120px]">
        <Image 
          className="absolute aspect-video w-full rounded-md z-10 border border-solid border-purple-700" 
          src={video.thumbnails!.medium.url} 
          width={video.thumbnails!.medium.width} 
          height={video.thumbnails!.medium.height} 
          alt='Thumbnail' />
      </div>
      <div className="w-full h-[52px] overflow-hidden pt-1">
        <h3 className="text-ellipsis line-clamp-2 text-xs">{video.title || ''}</h3>
      </div>
    </div>
  )
}