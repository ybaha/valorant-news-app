import create from "zustand";
import axios from "axios";
import usePostStore from "./post";
import React from "react";
import { View } from "react-native";

type MainStoreProps = {
  filters: string[];
  toggleFilters: (filter: string) => void;
  setFilters: (ar: string[]) => void;
  loading: boolean;
  setLoading: (b: boolean) => void;
  triggerFetch: boolean;
  setTriggerFetch: (b: boolean) => void;
  fetch: () => Promise<any>;
};

export const useMainStore = create<MainStoreProps>((set, get) => ({
  filters: [],
  toggleFilters: (filter) =>
    set((state) =>
      state.filters.includes(filter)
        ? { filters: state.filters.filter((i) => i !== filter) }
        : { filters: [...state.filters, filter] }
    ),
  setFilters: (ar) => set({ filters: ar }),
  loading: false,
  setLoading: (b: boolean) => set({ loading: b }),
  triggerFetch: true,
  setTriggerFetch: (b: boolean) => set({ triggerFetch: b }),
  fetch: async () => {
    let res,
      searchParams = get().filters.join(","),
      url = "http://192.168.0.18:3002/post";

    try {
      if (get().filters) url += `?tags=${searchParams}`;
      res = await axios.get(url);
      console.log("fetched");
    } catch {
      console.log("error");
    } finally {
      return res?.data.posts;
    }
  },
}));

// export const withMainContext: React.FC<{
//   Component: React.FC<MainStoreProps>;
// }> = ({ Component }) => {
//   const store = useMainStore();
//   return <Component {...store}></Component>;
// };
