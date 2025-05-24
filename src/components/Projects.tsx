import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { projects } from '../constants';

interface ProjectCardProps {
  project: {
    name: string;
    description: string;
    tags: {
      name: string;
      color: string;
    }[];
    image: string;
    source_code_link: string;
  };
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
}) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full h-full'>
        <div className='relative w-full h-[230px]'>
          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={() => window.open(project.source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <Github className='w-1/2 h-1/2 object-contain text-white' />
            </div>
          </div>

          <div className='w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
            <p className='text-white text-xl font-bold'>{project.name}</p>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{project.name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{project.description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {project.tags.map((tag) => (
            <p
              key={`${project.name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  return (
    <div className='mt-20'>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        
        <h2 className='text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]'>
          Projects.
        </h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          The following projects showcase my skills and experience through real-world examples of my work.
          Each project is briefly described with links to code repositories.
          They reflect my ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7 justify-center'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;