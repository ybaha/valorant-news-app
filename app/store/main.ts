import create from "zustand";

type MainStoreProps = {
  filters: string[];
  toggleFilters: (filter: string) => void;
  setFilters: (ar: string[]) => void;
  loading: boolean;
  setLoading: (b: boolean) => void;
  triggerFetch: boolean;
  setTriggerFetch: (b: boolean) => void;
};

export const useMainStore = create<MainStoreProps>((set) => ({
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
  triggerFetch: false,
  setTriggerFetch: (b: boolean) => set({ triggerFetch: b }),
}));
