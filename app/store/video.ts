import create from "zustand";

type VideoState = {
  isVideoRunning?: string;
  setIsVideoRunning: (b: string) => void;
};

const useVideoStore = create<VideoState>((set) => ({
  isVideoRunning: undefined,
  setIsVideoRunning: (b) => set({ isVideoRunning: b }),
}));

export default useVideoStore;
