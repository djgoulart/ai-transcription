import { create } from "zustand";
import { downloadListSlice, DownloadListSlice } from "./slices/download-list";



export const useStore = create<DownloadListSlice>()((...a) => ({
  ...downloadListSlice(...a)
}))