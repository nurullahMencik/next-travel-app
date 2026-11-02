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
      .then(async (res) => {
        const data = await res.json();
        // API hata dondururse ({ error }) dizi gelmez; .map ile sayfanin cokmemesi icin hata durumuna gec
        if (!res.ok || !Array.isArray(data)) throw new Error(data?.error || `HTTP ${res.status}`);
        return data;
      })
      .then((data) => {
        set({ hotels: data, loading: false });
      })
      .catch((err) => {
        console.log(err)
        set({ loading: false, error: true });
      });
  },
}));
