import create from "zustand";

type ScreenState = {
  isLoginScreen: boolean;
  setLoginScreen: () => void;
};

const useScreenStore = create<ScreenState>((set) => ({
  isLoginScreen: false,
  setLoginScreen: () =>
    set((state) => ({ isLoginScreen: !state.isLoginScreen })),
}));

export default useScreenStore;
