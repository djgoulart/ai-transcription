import { Video } from "."

export interface Audio {
  id: string
  name?: string
  title?: string
  url?: string
  fromVideo: Video
  extracted: boolean,
  playable: boolean,
  isExtracting: boolean,
  transcribed: boolean
  isTranscribing: boolean
  isLoading: boolean,
  isFetchingUrl: boolean,
}