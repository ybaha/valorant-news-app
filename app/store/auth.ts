import { User as FirebaseUser } from "firebase/auth";
import create from "zustand";

type AuthStoreProps = {
  user?: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
  loading: boolean;
  setLoading: (b: boolean) => void;
};

const useAuthStore = create<AuthStoreProps>((set: any) => ({
  user: null,
  setUser: (user) => set((state: any) => ({ user })),
  loading: false,
  setLoading: (b) => set(() => false),
}));

export default useAuthStore;
