import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav
      className="
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        flex items-center justify-between

        md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-24

        w-[calc(100%-0.5rem)] md:w-[calc(100%-7rem)] max-w-280

        px-4 py-3 md:pl-12 md:pr-16 md:py-6

        bg-[rgba(26,26,40,0.7)]
        rounded-xl shadow-xl
        border border-[rgba(255,255,255,0.15)]
        backdrop-blur-xl
        transition-all duration-500
      "
    >
      {/* Name — desktop only */}
      <div className="hidden md:flex md:items-center md:justify-start">
        <Link
          href="/"
          className="text-white text-xl font-bold tracking-wide"
        >
          Matias Freire
        </Link>
      </div>

      {/* Nav links */}
      <ul className="
        flex items-center justify-center
        gap-4 md:gap-4
        list-none m-0
      ">
        {["Home", "Skills", "About", "Projects"].map((item) => (
          <li
            key={item}
            className={item === "Home" ? "hidden sm:block md:block" : ""}
          >
            <Link
              href={`#${item.toLowerCase()}`}
              className="
                text-[#ccc] text-xs md:text-[13px] font-bold
                uppercase tracking-wide
                transition-colors duration-300
                hover:text-white
              "
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      {/* Icons */}
      <ul className="
        flex items-center justify-end
        gap-4 md:gap-5
        list-none m-0 p-0
      ">
        <li>
          <Link
            href="https://github.com/MatiasPF1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ccc] hover:text-white transition-colors"
          >
            <FaGithub className="w-5 h-5 md:w-7 md:h-7" />
          </Link>
        </li>

        <li>
          <Link
            href="https://www.linkedin.com/in/matias43/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ccc] hover:text-white transition-colors"
          >
            <FaLinkedin className="w-5 h-5 md:w-7 md:h-7" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
