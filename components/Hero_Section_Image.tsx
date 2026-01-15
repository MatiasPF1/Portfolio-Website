import Image from "next/image";

import { CiLocationOn } from "react-icons/ci"; //Location Icon
import { LuGraduationCap } from "react-icons/lu"; //Graduation Cap Icon
import { MdWorkOutline } from "react-icons/md"; // Work Outline Icon

export default function Hero_Section() {
  return (
    <div className="flex flex-col items-start md:items-center shrink-0">
      {/* Image Container */}
      <div className="relative h-[380px] w-[310px] rounded-xl shadow-lg">
        <Image
          src="/Matias.jpeg"
          alt="Hero Image"
          fill
          className="object-cover rounded-xl"
          priority
        />
      </div>

      {/* Status of Hero */}
      <div className="mt-3 hidden md:grid grid-cols-[auto_1fr] gap-x-2 gap-y-3 py-2 max-w-[310px]">
        {/* Location */}
        <CiLocationOn size={18} className="text-white self-center" />
        <span className="text-white text-xs leading-tight self-center">
          <b>New York Metropolitan Area</b>
        </span>

        {/* Education */}
        <LuGraduationCap size={18} className="text-white self-center" />
        <span className="text-white text-xs leading-snug self-center">
          <b>Bachelor's of Science in Computer Science, 2028</b>
        </span>

        {/* Work */}
        <MdWorkOutline size={18} className="text-white self-center" />
        <span className="text-white text-xs leading-snug self-center">
          <b>DL Research Assistant at Advanced Quantum Materials Lab</b>
        </span>
      </div>
    </div>
  );
}