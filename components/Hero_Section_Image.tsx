import Image from "next/image";

export default function Hero_Section() {
  return (
    // Right Section - Hero Image
    <div className="relative h-105 w-88 ml-290 mt-50  rounded-3xl shadow-sm">
      <Image
        src="/Me.jpeg"
        alt="Hero Image"
        fill
        className="object-cover rounded-xl"
        priority
      />
    </div>   
  
 
  );
}