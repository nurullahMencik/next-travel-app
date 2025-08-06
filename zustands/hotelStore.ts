import { create } from "zustand";

export const useHotelStore = create<HotelsState>((set) => ({
  hotels: [],
  loading: false,
  error: false,
  fetchHotels: (filters = {}) => {
    set({ loading: true, error: false });
    let url = "/api/hotels";
    const params = new URLSearchParams();

    if (filters.rating) params.append("rating", filters.rating);
    if (filters.priceMin) params.append("priceMin", filters.priceMin);
    if (filters.priceMax) params.append("priceMax", filters.priceMax);

    url += "?" + params.toString();
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        set({ hotels: data, loading: false });
      })
      .catch((err) => {
        console.log(err)
        set({ loading: false, error: true });
      });
  },
}));
