"use client";

import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useSearchParams} from "next/navigation";
import { useHotelStore } from "@/zustands/hotelStore";
import RentaCarFilters from "./RentaCarFilters";

const RentaCarList = () => {
  const { error, fetchHotels, hotels, loading } = useHotelStore();

  const searchParams = useSearchParams();


 
  console.log(hotels);
 

  useEffect(() => {
    const filters= {
      rating: searchParams.get("rating") || "",
      priceMin: searchParams.get("priceMin") || "",
      priceMax: searchParams.get("priceMax") || "",
    };
    fetchHotels(filters);
  }, [searchParams,fetchHotels]);

  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hotels useSearchParams and Zustand</h1>


        <RentaCarFilters />
 
    
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-72 w-full rounded-lg" />
          ))}
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 font-semibold">
          Something went wrong
        </div>
      )}

      {!loading && !error && hotels.length === 0 && (
        <div className="text-center text-blue-500 font-semibold">
          No hotels found.
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="shadow-md">
              <CardHeader>
                <Image
                  height={500}
                  width={500}
                  src={hotel.photos[0]}
                  alt={hotel.name}
                  className="w-full h-48 object-cover rounded"
                />
                <CardTitle className="text-lg font-semibold mt-2">
                  {hotel.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{hotel.rating} *</p>

                <p className="text-gray-700">{hotel.description}</p>
                <p className="text-sm text-gray-500">{hotel.location}</p>
                <p className="text-lg font-bold">
                  ${hotel.pricePerNight} / night
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RentaCarList;
