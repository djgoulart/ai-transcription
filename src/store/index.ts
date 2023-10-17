import { create } from "zustand";
import { downloadListSlice, DownloadListSlice } from "./slices/download-list";
import { audioListSlice, AudioListSlice } from "./slices/audio-list";
import { transcriptionSlice, TranscriptionListSlice } from "./slices/transcription-list";



export const useStore = 
  create<DownloadListSlice & AudioListSlice & TranscriptionListSlice>()((...a) => ({
  ...downloadListSlice(...a),
  ...audioListSlice(...a),
  ...transcriptionSlice(...a)
}))