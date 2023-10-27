import { StateCreator } from "zustand";
import { Transcription } from "@/models";

export interface TranscriptionListSlice {
  transcriptions: Array<Transcription>
  addTranscription: (transcription: Transcription) => void
  addTextName: (transcriptionId: string, fileName: string) => void
  addTextUrl: (transcriptionId: string, fileUrl: string) => void
  markAsLoading: (audioId: string) => void
  unmarkAsLoading: (audioId: string) => void
  markAsTranscribing: (audioId: string) => void
  markAsTranscribed: (audioId: string, text: string) => void
  markAsEmbed: (transcriptionId: string) => void
}

export const transcriptionSlice: StateCreator<TranscriptionListSlice, [], [], TranscriptionListSlice> = (set) => ({
  transcriptions: [],
  addTranscription: (transcription: Transcription) => set((state) => (
    {
      transcriptions: [...state.transcriptions, transcription]
    }
  )),
  addTextName: (transcriptionId: string, fileName: string) => set((state) => {
    
    const transcription = state.transcriptions.find(item => item.id === transcriptionId)
    if(transcription) {
      const oldState = state.transcriptions.filter(item => item.id !== transcriptionId)
      return ({
        transcriptions: [...oldState, {
          ...transcription,
          name: fileName
        }]
      })
    }
    return state
  }),
  addTextUrl: (transcriptionId: string, fileUrl: string) => set((state) => {
    
    const transcription = state.transcriptions.find(item => item.id === transcriptionId)
    if(transcription) {
      const oldState = state.transcriptions.filter(item => item.id !== transcriptionId)
      return ({
        transcriptions: [...oldState, {
          ...transcription,
          url: fileUrl
        }]
      })
    }
    return state
  }),
  markAsLoading: (transcriptionId: string) => set((state) => {
    
    const transcription = state.transcriptions.find(item => item.id === transcriptionId)
    if(transcription) {
      const oldState = state.transcriptions.filter(item => item.id !== transcriptionId)
      return ({
        transcriptions: [...oldState, {
          ...transcription,
          isLoading: true
        }]
      })
    }
    return state
  }),
  unmarkAsLoading: (transcriptionId: string) => set((state) => {
    
    const transcription = state.transcriptions.find(item => item.id === transcriptionId)
    if(transcription) {
      const oldState = state.transcriptions.filter(item => item.id !== transcriptionId)
      return ({
        transcriptions: [...oldState, {
          ...transcription,
          isLoading: false
        }]
      })
    }
    return state
  }),
  markAsTranscribing: (transcriptionId: string) => set((state) => {
    
    const transcription = state.transcriptions.find(item => item.id === transcriptionId)
    if(transcription) {
      const oldState = state.transcriptions.filter(item => item.id !== transcriptionId)
      return ({
        transcriptions: [...oldState, {
          ...transcription,
          isTranscribing: true
        }]
      })
    }
    return state
  }),
  markAsTranscribed: (transcriptionId: string, text: string) => set((state) => {
    
    const transcription = state.transcriptions.find(item => item.id === transcriptionId)
    if(transcription) {
      const oldState = state.transcriptions.filter(item => item.id !== transcriptionId)
      return ({
        transcriptions: [...oldState, {
          ...transcription,
          text,
          transcribed: true,
          isTranscribing: false
        }]
      })
    }
    return state
  }),
  markAsEmbed: (transcriptionId: string) => set((state) => {
    
    const transcription = state.transcriptions.find(item => item.id === transcriptionId)
    if(transcription) {
      const oldState = state.transcriptions.filter(item => item.id !== transcriptionId)
      return ({
        transcriptions: [...oldState, {
          ...transcription,
          embed: true
        }]
      })
    }
    return state
  })
})