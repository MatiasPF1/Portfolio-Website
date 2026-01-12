import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


export default function Navbar() {
  return (
    //nav container
    <nav
      className="flex justify-between items-center bg-[rgba(26,26,40,0.7)] px-16 py-6 rounded-xl shadow-xl border border-[rgba(255,255,255,0.15)] backdrop-blur-xl fixed w-[calc(100%-6rem)] z-50 max-w-[1120px] mx-auto mt-6 left-1/2 top-0 transform -translate-x-1/2 transition-all duration-500"
    >
      {/* Logo (left side) */}
      <div>
        <Link href="/" className="text-white text-xl font-bold no-underline tracking-wide">
          Matias Freire
        </Link>
      </div>

      {/* Navigation Links (center/right) */}
      <ul className="flex gap-8 list-none m-0">
        <li>
          <a href="#home" className="text-[#ccc] text-sm no-underline uppercase transition-colors duration-300 hover:text-white">
            Home
          </a>
        </li>

        <li>
          <a href="#skills" className="text-[#ccc] text-sm no-underline uppercase transition-colors duration-300 hover:text-white">
            Skills
          </a>
        </li>

        <li>
          <a href="#about" className="text-[#ccc] text-sm no-underline uppercase transition-colors duration-300 hover:text-white">
            About
          </a>
        </li>

        <li>
          <a href="#projects" className="text-[#ccc] text-sm no-underline uppercase transition-colors duration-300 hover:text-white">
            Projects
          </a>
        </li>
      </ul>

      {/* LinkedIn and GitHub Icons & Links */}
      <ul className="flex gap-5 list-none m-0 p-0">
        <li>
          <a href="https://github.com/MatiasPF1" target="_blank" rel="noopener noreferrer" className="text-[#ccc] hover:text-white transition-colors duration-300" aria-label="GitHub">
            <FaGithub size={28} />
          </a>
        </li>

        <li>
          <a href="https://www.linkedin.com/in/matias43/" target="_blank" rel="noopener noreferrer" className="text-[#ccc] hover:text-white transition-colors duration-300" aria-label="LinkedIn">
            <FaLinkedin size={28} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
