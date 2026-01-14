import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav
      className="
      fixed top-4 left-1/2 -translate-x-1/2 z-50
      flex items-center justify-between
      w-[calc(100%-9rem)] md:w-[calc(100%-6rem)] max-w-[1120px]
      px-15 py-5 md:px-16 md:py-6 
    bg-[rgba(26,26,40,0.7)]
      rounded-xl shadow-xl
      border border-[rgba(255,255,255,0.15)]
      backdrop-blur-xl
      transition-all duration-500
      "
    >
      <div className="hidden md:block"> {/* Name — hidden on mobile */}
        <Link
          href="/"
          className="text-white text-xl font-bold tracking-wide" 
        >
          Matias Freire
        </Link>
      </div>

      {/* Nav links */}
      <ul className="flex gap-4 md:gap-8 list-none m-0">

        {["Home", "Skills", "About", "Projects"].map((item) => (
          <li key={item}>

            <a
              href={`#${item.toLowerCase()}`}
              className="
                text-[#ccc] text-xs md:text-sm
                uppercase tracking-wide
                transition-colors duration-300
                hover:text-white
              "
            >
              {item}
            </a>

          </li>
        ))}
      </ul>

      {/* Icons */}
      <ul className="flex gap-3 md:gap-5 list-none m-0 p-0">
        <li>
          <a
            href="https://github.com/MatiasPF1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ccc] hover:text-white transition-colors"
          >
            <FaGithub className="w-5 h-5 md:w-7 md:h-7" />
          </a>
        </li>

        <li>
          <a
            href="https://www.linkedin.com/in/matias43/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ccc] hover:text-white transition-colors"
          >
            <FaLinkedin className="w-5 h-5 md:w-7 md:h-7" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
