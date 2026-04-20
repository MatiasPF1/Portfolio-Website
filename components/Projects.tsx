'use client';

import Shuffle from '@/Reactbits_Components/Shuffletext';
import Link from 'next/link';

const projects = [
  {
    title: 'MoS2-Image-Synthesis-Analysis-Platform',
    description:
      'First in its class platform pipeline for synthesizing realistic computational scanning transmission electron microscopy (STEM) images for 2D nanomaterial deep learning based studies in nanomaterials defects research.',
    image: '/STEM.png',
    tech: ['Pytorch', 'Dash-Plotly', 'CSS'],
    repo: 'https://github.com/MatiasPF1/MoS2-Image-Synthesis-Analysis-Platform',
  },

  {
    title: 'SHPE Stevens Chapter Website',
    description:
      'Lead Developer of the website for the Stevens Institute of Technology chapter of SHPE, an organization dedicated to supporting Hispanic students in Engeenier.',
    image: '/SHPE.png',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    repo: 'https://github.com/MatiasPF1/SHPE-Stevens-Chapter',
  },

  
  {
    title: 'Colorstack Stevens Chapter Website',
    description:
      'Lead Developer of the website for the Stevens Institute of Technology chapter of ColorStack, an organization dedicated to supporting Black and Latinx students in tech.',
    image: '/Colorstack.png',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    repo: 'https://github.com/MatiasPF1/Colorstack-StevensChapter',
  },
  {
    title: 'Interactive-Neural-Network-Digit-Classifier',
    description:
      'An interactive Streamlit-based web application that allows users to draw digits and see how a neural network recognizes them in real time.',
    image: '/Interactive-Neural-Network.png',
    tech: ['Pytorch', 'Streamlit', 'Pygame'],
    repo: 'https://github.com/MatiasPF1/Interactive-Neural-Network-Digit-Classifier',
  },




];

export default function Projects_Section() {
  return (
    <section className="w-full min-h-screen text-[#fcf4f4] font-press-start md:-mt-2 lg:-mt-38">
      {/* Title */}
      <div className="flex justify-center mb-6 md:mb-10 -translate-y-15">
        <Shuffle
          text="Projects"
          shuffleDirection="left"
          ease="power2.out"
          duration={1.4}
          shuffleTimes={1}
          stagger={0.03}
          loop
          loopDelay={2}
        />
      </div>

      {/* Projects Grid */}
      <div className="mx-auto max-w-[1300px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-5">
        {projects.map((project, i) => (
          <div
            key={i}
            className="group bg-slate-900/70 backdrop-blur-xl rounded-2xl overflow-hidden
                       border border-slate-700/50
                       shadow-2xl shadow-black/40
                       transition-all duration-500 ease-out
                       hover:border-slate-600/60
                       hover:-translate-y-3
                       flex flex-col"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10"></div>
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover
                           transition-all duration-500 ease-out
                           group-hover:scale-105 brightness-90 group-hover:brightness-100"
              />
            </div>

            {/* Content - Flex grow to push button to bottom */}
            <div className="p-6 flex flex-col gap-3 flex-grow">
              <h3 className="text-base leading-tight text-white transition-colors duration-300">
                {project.title}
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed flex-grow transition-colors duration-300">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-[10px] rounded-lg
                               border border-cyan-400/50
                               text-cyan-300 bg-cyan-400/5
                               transition-all duration-300
                               hover:bg-cyan-400/15 hover:border-cyan-400/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* View Project Button - Always at bottom */}
              <Link
                href={project.repo}
                target="_blank"
                className="mt-4 text-center px-5 py-3 rounded-xl text-xs font-semibold
                           bg-cyan-500 text-black
                           transition-all duration-300
                           hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/40
                           hover:scale-[1.02]
                           active:scale-95"
              >
                View Project 
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}