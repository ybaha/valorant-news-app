import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { persist } from "zustand/middleware";

export type InteractedPost = {
  postId: string;
  reported: boolean;
  upvoted: boolean;
  downvoted: boolean;
};

type PostStore = {
  reportedPosts: string[];
  togglePostReport: (postId: string) => void;
  interactedPosts: InteractedPost[];
  setInteractedPosts: (p: InteractedPost) => void;
};

const handleReport = (rp: string[], post: string) => {
  console.log({ rpFirstState: rp });
  if (rp.includes(post)) rp.splice(rp.indexOf(post), 1);
  else rp.push(post);
  console.log({ rpLastState: rp });
  return rp;
};

const handleInteraction = (ip: InteractedPost[], p: InteractedPost) => {
  if (!p.postId) return ip;

  let post = ip.find((i) => i.postId === p.postId);

  if (post) {
    let postIndex = ip.findIndex((i) => i.postId === p.postId);
    ip.splice(postIndex, 1);
  } else post = { postId: p.postId } as InteractedPost;

  post = { ...p };

  ip.push(post);

  console.log(p);
  console.log(ip);

  return ip;
};

const usePostStore = create<PostStore>(
  persist(
    (set, get) => ({
      reportedPosts: [],
      togglePostReport: (post: string) =>
        set({ reportedPosts: handleReport(get().reportedPosts, post) }),
      // addAFish: () => set({ fishes: get().fishes + 1 }),
      interactedPosts: [],
      setInteractedPosts: (p) =>
        set({ interactedPosts: handleInteraction(get().interactedPosts, p) }),
    }),
    {
      name: "interacted-posts", // unique name
      getStorage: () => AsyncStorage, // Add this here!
    }
  )
);

export default usePostStore;
