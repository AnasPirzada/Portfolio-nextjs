import { PROJECTS } from '../../constants.js';
import Card from './ProjectCard.js';

export default function ProjectsPage() {
  return (
    <div className='p-6 sm:p-8 md:p-10 mt-12 md:mt-20 section-container'>
      <div className='mb-8 md:mb-12'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3'>
          All Projects
        </h1>
        <p className='text-base sm:text-lg text-gray-400'>
          Here you can see all my projects...
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'>
        {PROJECTS.map((project, index) => (
          <Card project={project} key={project.name} />
        ))}
      </div>
    </div>
  );
}
