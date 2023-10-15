import { create } from "zustand";
import { downloadListSlice, DownloadListSlice } from "./slices/download-list";
import { audioListSlice, AudioListSlice } from "./slices/audio-list";



export const useStore = create<DownloadListSlice & AudioListSlice>()((...a) => ({
  ...downloadListSlice(...a),
  ...audioListSlice(...a),
}))