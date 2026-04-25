import Image from "next/image";
import Hero from "./components/Hero/Hero";
import FeaturesSection from "./components/FeaturesSection/FeaturesSection";
import CategoriesSection from "./components/Categoriessection/Categoriessection";
import Testimonial from "./components/Testimonial/Testimonial";
import CTASection from "./components/Ctasection/Ctasection";

export default function Home() {
  return (
   <>
     <Hero ></Hero>
     <FeaturesSection></FeaturesSection>
     <CategoriesSection></CategoriesSection>
     <Testimonial></Testimonial>
     <CTASection></CTASection>
  
   </>
  );
}
