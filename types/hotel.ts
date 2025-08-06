

interface Hotel {
  id: string; 
  name: string;
  rating: number;
  description: string;
  location: string;
  pricePerNight: number; 
  photos: string[]; 
}
interface HotelsState {
  hotels:Hotel[],
  loading:boolean,
  error:boolean,
  fetchHotels:(filters?:Record<string,string>)=>void,
}

