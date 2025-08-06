import RecentProduct from "@/components/sections/recent/RecentProduct";
import Hero from "./_components/Hero/Hero";
import SectionOne from "./_components/Section/SectionOne";
import SectionTwo from "./_components/Section/SectionTwo";


export default function Home() {
  return (
   <div>

    <Hero/>
    <div className="min-h-24"></div>
    <SectionOne/>
    <SectionTwo/>
    <RecentProduct/>
 <div className="min-h-44"></div>
   </div>
  );
}
