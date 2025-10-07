import { PROJECTS } from '../../constants.js';
import Card from './ProjectCard.js';

export default function ProjectsPage() {
  return (
    <div className='p-10 mt-20'>
      <h1 className='text-4xl font-bold'>All Projects</h1>
      <p className='mt-4'>Here you can see all my projects...</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-6'>
        {PROJECTS.map((project, index) => (
          <Card
            classes={
              index === PROJECTS.length - 1 ? '' : 'mr-10 xs:mr-12 sm:mr-16'
            }
            project={project}
            key={project.name}
          />
        ))}
      </div>
    </div>
  );
}
