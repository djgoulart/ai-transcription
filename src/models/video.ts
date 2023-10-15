export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Video {
  id: string
  title?: string
  isRequestingInfo: boolean
  hasInfo: boolean
  thumbnails?: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
  }
}

