import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { persist } from "zustand/middleware";
import { Post } from "../../server/node_modules/.prisma/client";

type InteractedPost = {
  postId: string;
  reported: boolean;
  bookmarked: boolean;
  upvoted: boolean;
  downvoted: boolean;
};

type PostStore = {
  reportedPosts: string[];
  togglePostReport: (postId: string) => void;
  bookmarkedPosts: Post[];
  togglePostBookmark: (post: Post) => void;
  interactedPosts: InteractedPost[];
  setInteractedPosts: (p: InteractedPost) => void;
};

const handleReport = (rp: string[], post: string) => {
  if (rp.includes(post)) rp.splice(rp.indexOf(post), 1);
  else rp.push(post);
  return rp;
};

const handleBookmark = (bposts: Post[], post: Post) => {
  if (bposts.find((p) => p.id === post.id))
    bposts.splice(
      bposts.findIndex((p) => p.id === post.id),
      1
    );
  else bposts.push(post);
  // console.log({ bposts });
  return bposts;
};

const handleInteraction = (ip: InteractedPost[], p: InteractedPost) => {
  if (!p.postId) return ip;

  let post = ip.find((i) => i.postId === p.postId);

  if (post) {
    let postIndex = ip.findIndex((i) => i.postId === p.postId);
    ip.splice(postIndex, 1);
  } else post = { postId: p.postId } as InteractedPost;

  post = { ...p };

  if (Object.values(p).includes(true)) ip.push(post);

  // console.log(ip);

  return ip;
};

const usePostStore = create<PostStore>(
  persist(
    (set, get) => ({
      reportedPosts: [],
      togglePostReport: (post: string) =>
        set({ reportedPosts: handleReport(get().reportedPosts, post) }),

      bookmarkedPosts: [],
      togglePostBookmark: (post: Post) =>
        set({ bookmarkedPosts: handleBookmark(get().bookmarkedPosts, post) }),

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
