import React from 'react';
import { Hero, About, Experience, Tech, Projects, Contact } from '../components';
import { StarsCanvas } from '../components/Canvas';

const Home: React.FC = () => {
  return (
    <div className="relative z-0">
      <div className="bg-primary">
        <Hero />
      </div>
      
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto sm:px-16 px-6">
          <div id="about" className="pt-24 pb-12">
            <About />
          </div>
          
          <div id="experience" className="pt-24 pb-12">
            <Experience />
          </div>
          
          <div className="pt-24 pb-12">
            <Tech />
          </div>
          
          <div id="projects" className="pt-24 pb-12">
            <Projects />
          </div>
          
          <div id="contact" className="pt-24 pb-32">
            <Contact />
          </div>
        </div>
        
        <StarsCanvas />
      </div>
    </div>
  );
};

export default Home;