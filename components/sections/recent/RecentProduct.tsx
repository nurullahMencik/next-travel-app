"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { packages } from "@/constans";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const RecentProduct = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="container mx-auto px-8 lg:px-12 mt-[80px]"
    >
      <CarouselContent>
        {packages.map((item, index) => (
          <CarouselItem key={index} className="lg:basis-1/2 xl:basis-1/4">
            <div className="p-3">
              <Card className="shadow-2xl">
                <CardHeader className="relative">
                  <Image
                    src={item.image}
                    height={500}
                    width={500}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute left-6 bg-red-500 hover:bg-red-600 text-sm text-white">
                    {item.discount}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardTitle className="h-[60] text-xl">{item.title}</CardTitle>
                  <CardDescription className="flex items-center text-sm mt-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    {item.location}
                  </CardDescription>
                  <CardDescription className="flex items-center text-sm mt-2">
                    <Clock className="w-4 h-4 mr-2" />
                    {item.duration}
                  </CardDescription>
                  <div className="flex  mt-2">
                    <span className="text-orange-500 text-xl">{item.price}</span>
                    <span className="text-gray-500 line-through ml-2">{item.oldPrice}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 bg-orange-500 hover:bg-orange-600 text-white hover:text-white py-6 px-6 cursor-pointer" />
      <CarouselNext className="right-0  bg-orange-500 hover:bg-orange-600 text-white hover:text-white py-6 px-6 cursor-pointer" />
    </Carousel>
  );
};

export default RecentProduct;
