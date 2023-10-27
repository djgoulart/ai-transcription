export interface Transcription {
  id: string
  name?: string
  title?: string
  sourceUrl?: string
  url?: string
  text: string
  transcribed: boolean
  isLoading: boolean
  isTranscribing: boolean
  embed: boolean
}