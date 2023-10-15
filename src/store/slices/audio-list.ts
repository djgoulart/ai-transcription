import {StateCreator } from "zustand";
import { Audio } from "@/models";

export interface AudioListSlice {
  audios: Array<Audio>
  addAudio: (audio: Audio) => void
  markAudioAsExtracting: (audioId: string) => void
  markAudioAsExtracted: (audioId: string) => void
  addFileName: (audioId: string, fileName: string) => void
  addFileUrl: (audioId: string, fileUrl: string) => void
  markAudioAsPlayable: (audioId: string) => void
  markAudioAsLoading: (audioId: string) => void
  unmarkAudioAsLoading: (audioId: string) => void
}

export const audioListSlice: StateCreator<AudioListSlice, [], [], AudioListSlice> = (set) => ({
  audios: [],
  addAudio: (audio: Audio) => set(({audios}) => (
    {
      audios: [...audios, audio]
    }
  )),
  markAudioAsExtracting: (audioId: string) => set((state) => {
    console.log('MARK_AUDIO_AS_EXTRACTING', audioId)
    const audio = state.audios.find(item => item.id === audioId)
      if(audio) {
        const oldState = state.audios.filter(item => item.id !== audioId)
        return ({
          audios: [...oldState, {
            ...audio,
            isExtracting: true,
          }]
        })
      }
    return state
  }),
  markAudioAsExtracted: (audioId: string) => set((state) => {
    console.log('MARK_AUDIO_AS_EXTRACTED', audioId)
    const audio = state.audios.find(item => item.id === audioId)
      if(audio) {
        const oldState = state.audios.filter(item => item.id !== audioId)
        return ({
          audios: [...oldState, {
            ...audio,
            extracted: true,
            isExtracting: false,
          }]
        })
      }
    return state
  }),
  addFileName: (audioId: string, fileName: string) => set((state) => {
    console.log('ADD_AUDIO_FILE_NAME', audioId)
    const audio = state.audios.find(item => item.id === audioId)
      if(audio) {
        const oldState = state.audios.filter(item => item.id !== audioId)
        return ({
          audios: [...oldState, {
            ...audio,
            name: fileName
          }]
        })
      }
    return state
  }),
  addFileUrl: (audioId: string, fileUrl: string) => set((state) => {
    console.log('ADD_AUDIO_FILE_URL', audioId)
    const audio = state.audios.find(item => item.id === audioId)
      if(audio) {
        const oldState = state.audios.filter(item => item.id !== audioId)
        return ({
          audios: [...oldState, {
            ...audio,
            url: fileUrl
          }]
        })
      }
    return state
  }),
  markAudioAsPlayable: (audioId: string) => set((state) => {
    console.log('MARK_AUDIO_AS_PLAYABLE', audioId)
    const audio = state.audios.find(item => item.id === audioId)
      if(audio) {
        const oldState = state.audios.filter(item => item.id !== audioId)
        return ({
          audios: [...oldState, {
            ...audio,
            playable: true
          }]
        })
      }
    return state
  }),
  markAudioAsLoading: (audioId: string) => set((state) => {
    console.log('MARK_AUDIO_AS_LOADING', audioId)
    const audio = state.audios.find(item => item.id === audioId)
      if(audio) {
        const oldState = state.audios.filter(item => item.id !== audioId)
        return ({
          audios: [...oldState, {
            ...audio,
            isLoading: true
          }]
        })
      }
    return state
  }),
  unmarkAudioAsLoading: (audioId: string) => set((state) => {
    console.log('MARK_AUDIO_AS_LOADING', audioId)
    const audio = state.audios.find(item => item.id === audioId)
      if(audio) {
        const oldState = state.audios.filter(item => item.id !== audioId)
        return ({
          audios: [...oldState, {
            ...audio,
            isLoading: false
          }]
        })
      }
    return state
  })
})
