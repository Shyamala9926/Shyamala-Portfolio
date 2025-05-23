import React from 'react';
import { motion } from 'framer-motion';
import { Projects as ProjectsComponent } from '../components';
import { StarsCanvas } from '../components/Canvas';

const Projects: React.FC = () => {
  return (
    <div className="relative z-0">
      <div className="bg-primary min-h-screen">
        <div className="pt-32 pb-16 max-w-7xl mx-auto sm:px-16 px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectsComponent />
          </motion.div>
        </div>
        <StarsCanvas />
      </div>
    </div>
  );
};

export default Projects;