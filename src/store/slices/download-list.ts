import { StateCreator } from "zustand";
import { Video } from "@/models/video";
export interface DownloadListSlice {
  videos: Array<Video>
  addVideo: (video: Video) => void
  addVideoInfo: (videoId: string, info: Partial<Video>) => void
  videoInfoRequestCompleted: (videoId: string) => void
  removeVideo: (videoId: string) => void
}

export const downloadListSlice: StateCreator<DownloadListSlice, [], [], DownloadListSlice> = (set) => ({
  videos: [],
  addVideo: (video: Video) => set(({ videos }) => (
    {
      videos: [...videos, video]
    }
  )),
  addVideoInfo: (videoId: string, info: Partial<Video>) => set((state) => {
    console.log('ADD_VIDEO_INFO', videoId)
    const video = state.videos.find(item => item.id === videoId)
    if (video) {
      const oldState = state.videos.filter(item => item.id !== videoId)
      return ({
        videos: [...oldState, {
          ...video,
          ...info,
          hasInfo: true,
        }]
      })
    }
    return state
  }),
  videoInfoRequestCompleted: (videoId: string) => set((state) => {
    console.log('VIDEO_INFO_COMPLETED', videoId)
    const video = state.videos.find(item => item.id === videoId)
    if (video) {
      const oldState = state.videos.filter(item => item.id !== videoId)
      return ({
        videos: [...oldState, {
          ...video,
          isRequestingInfo: false,
        }]
      })
    }
    return state
  }),
  removeVideo: (videoId: string) => set((state) => {
    console.log('REMOVE_VIDEO', videoId)
    const video = state.videos.find(item => item.id === videoId)
    if(!video) return state
    
    const oldState = state.videos.filter(item => item.id !== videoId)
    return ({
      videos: [...oldState ]
    })
  }),
})

