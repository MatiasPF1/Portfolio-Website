import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


export default function Navbar() {
  return (
    //nav container
    <nav
      className="flex justify-between items-center bg-[rgba(26,26,26,0.4)] px-9.5 py-5.75 rounded-[10px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-[rgba(255,255,255,0.1)] backdrop-blur-md fixed w-full z-100 max-w-370 mx-auto mt-7 mb-5 left-1/2 top-0 transform -translate-x-1/2"
    >
      {/* Logo (left side) */}
      <div>
        <Link href="/" className="text-white text-[1.5rem] font-bold no-underline tracking-[1px] pl-5">
          Matias Freire
        </Link>
      </div>

      {/* Navigation Links (center/right) */}
      <ul className="flex gap-12.5 list-none m-0 pr-20 ">
        <li> 
          <Link href="/" className="text-[#ccc] text-[1rem] no-underline uppercase transition-colors duration-300 relative overflow-hidden px-1.25 hover:text-white">
            Home
          </Link>
        </li>

        <li>
          <Link
            href="/about"
            className="text-[#ccc] text-[1rem] no-underline uppercase transition-colors duration-300 relative overflow-hidden px-1.25 hover:text-white">
            About
          </Link>
        </li>

        <li>
          <Link href="/projects" className="text-[#ccc] text-[1rem] no-underline uppercase transition-colors duration-300 relative overflow-hidden px-1.25 hover:text-white">
            Experience 
          </Link>
        </li>


        <li>
          <Link href="/contact" className="text-[#ccc] text-[1rem] no-underline uppercase transition-colors duration-300 relative overflow-hidden px-1.25 hover:text-white">
            Projects
          </Link>
        </li>
      </ul>

      {/* LinkedIn and GitHub Icons & Links */}
      <ul className="flex gap-6 list-none m-0 p-0 pr-20 ">

        <li>
          <a href="https://github.com/MatiasPF1"target="_blank"rel="noopener noreferrer"className="text-[#ccc] hover:text-white text-2xl transition-colors duration-300"
          aria-label="GitHub">
            <FaGithub size={36} />
          </a>
        </li>

        <li>
          <a href="https://www.linkedin.com/in/matias43/" target="_blank"rel="noopener noreferrer"className="text-[#ccc] hover:text-white text-2xl transition-colors duration-300"
          aria-label="LinkedIn" >
            <FaLinkedin size={36} />
          </a>
        </li>
      </ul>



    </nav>
  );
}
