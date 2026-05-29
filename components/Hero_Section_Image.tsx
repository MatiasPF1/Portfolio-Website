import Image from "next/image";

import { CiLocationOn } from "react-icons/ci"; //Location Icon
import { LuGraduationCap } from "react-icons/lu"; //Graduation Cap Icon

export default function Hero_Section() {
  return (
    <div className="flex flex-col items-center shrink-0">
      {/* Image Container */}
      <div className="relative h-[385px] w-[310px] rounded-xl shadow-lg">
        <Image
          src="/me.jpeg"
          alt="Hero Image"
          fill
          className="object-cover rounded-xl"
          priority
        />
      </div>

      {/* Status of Hero */}
      <div className="mt-3 grid grid-cols-[auto_1fr] gap-x-2 gap-y-2.5 py-2 max-w-[310px]">
        {/* Location */}
        <CiLocationOn size={17} className="text-white self-center" />
        <span className="text-white text-[14px] leading-tight self-center">
          <b>New York Metropolitan Area</b>
        </span>

        {/* Education */}
        <LuGraduationCap size={17} className="text-white self-center" />
        <span className="text-white text-[14px] leading-snug self-center">
          <b>B.S. Computer Science, Stevens Institute of Technology, 2028</b>
        </span>

        {/* Cornell Tech AI Fellow */}
        <LuGraduationCap size={17} className="text-white self-center" />
        <span className="text-white text-[14px] leading-snug self-center">
          <b>Cornell Tech AI Fellow 2026/2027</b>
        </span>

        
      </div>
    </div>
  );
}