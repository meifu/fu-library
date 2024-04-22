import { create } from 'zustand'

export interface ArtistState {
  artists: string[];
  setArtists: (values: string[]) => void;
}

export const useBearStore = create<ArtistState>((set) => ({
  artists: [],
  setArtists: (values) => set((state) => ({ artists: values })),
}));