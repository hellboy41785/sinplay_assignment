import { gallery } from '@/utils/localdata'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { IGallery } from '../../types/gallery'

interface GalleryState {
  gallery: IGallery[]
}

export const useGalleryStore = create<GalleryState>()(
  devtools(
    persist(
      (set) => ({
        gallery:gallery,
     
      }),
      {
        name: 'gallery',
      }
    )
  )
)