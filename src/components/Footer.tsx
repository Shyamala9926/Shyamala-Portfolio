import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black-100 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold">Shyamala Janamoni</h2>
            <p className="text-secondary mt-2">Full-Stack Developer</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://github.com/Shyamala9926" className="hover:text-blue-500 transition-colors duration-300">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/shyamala-janamoni/" className="hover:text-blue-500 transition-colors duration-300">
              <Linkedin size={24} />
            </a>
            <a href="mailto:shyamalajanamoni2002@gmail.com" className="hover:text-blue-500 transition-colors duration-300">
              <Mail size={24} />
            </a>
            <a href="tel:9666748346" className="hover:text-blue-500 transition-colors duration-300">
              <Phone size={24} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Shyamala Janamoni. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex flex-wrap justify-center space-x-6">
              <li className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                <a href="#about">About</a>
              </li>
              <li className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                <a href="#experience">Experience</a>
              </li>
              <li className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                <a href="#projects">Projects</a>
              </li>
              <li className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;