'use client'
import { Video } from '@/models';

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface VideoSnippetData {
  title: string
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
  }
}

interface VideoDataResponseType {
  items: Array<{
    id: string,
    title: string,
    snippet: VideoSnippetData,
    tags: Array<string>
  }>
}

export interface UseFetchVideoResponse {
  id: string,
  title: string,
  snippet: VideoSnippetData,
  tags: Array<string>
}


export function useVideo(){
  async function fetchInfo(videoId: string): Promise<Pick<Video, "id" | "title" | "thumbnails"> | undefined> {
    
    const fetchResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet`, {
        method: 'GET',
        cache: 'force-cache'
      });
  
    if(fetchResponse.ok) {
      const data: VideoDataResponseType = await fetchResponse.json()
      
      const video = {
        id: data.items[0].id,
        title: data.items[0].snippet.title,
        thumbnails: data.items[0].snippet.thumbnails,
      }

      return video
    }
  }

  async function extractAndUploadAudioFile(videoId: string): Promise<{
    $metadata: {
      httpStatusCode: number
    }
    Key: string
  }> {
    const fetchResponse = await fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify({videoId: videoId})
    })

    return await fetchResponse.json()
  }

  return {fetchInfo, extractAndUploadAudioFile}
}