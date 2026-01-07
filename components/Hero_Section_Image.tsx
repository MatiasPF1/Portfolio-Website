import Image from "next/image";

import { CiLocationOn } from "react-icons/ci"; //Location Icon
import { LuGraduationCap } from "react-icons/lu"; //Graduation Cap Icon
import { MdWorkOutline } from "react-icons/md"; // Work Outline Icon




export default function Hero_Section() {
  return (
    <div className="relative h-105 w-88 ml-290 mt-50 rounded-3xl shadow-sm">
      <Image
        src="/Matias.jpeg"
        alt="Hero Image"
        fill
        className="object-cover rounded-xl"
        priority
      />

  {/* Status of Hero */}
<div className="absolute left-6 bottom-6 translate-y-46 z-10 grid grid-cols-[auto_1fr] gap-x-4 gap-y-6  py-4  ">


  {/* Location */}
  <CiLocationOn size={24} className="text-white" />
  <span className="text-white text-sm leading-none self-center">
    New York Metropolitean Area
  </span>

  {/* Education */}
  <LuGraduationCap size={24} className="text-white" />
  <span className="text-white text-sm leading-none self-center">
    Bachelor's in computer science, 2028
  </span>

  {/* Work */}
  <MdWorkOutline size={24} className="text-white" />
  <span className="text-white text-sm leading-none self-center">
    DL Research Assistant at Advanced Quantumn Materials Lab
  </span>
</div>
     
    </div>
  );
}