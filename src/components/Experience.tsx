import React from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../constants';

interface ExperienceCardProps {
  experience: {
    title: string;
    company_name: string;
    icon: string;
    iconBg: string;
    date: string;
    points: string[];
  };
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <div className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'>
      <div className='relative w-full h-[230px]'>
        <div className='bg-black-100 p-4 rounded-2xl'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <div
                className='w-10 h-10 rounded-full flex justify-center items-center'
                style={{ backgroundColor: experience.iconBg }}
              >
                <div className='w-1/2 h-1/2 object-contain' />
              </div>
              <div>
                <h3 className='text-white text-[20px] font-bold'>{experience.title}</h3>
                <p className='text-secondary text-[16px] font-semibold' style={{ margin: 0 }}>
                  {experience.company_name}
                </p>
              </div>
            </div>
          </div>
          <p className='text-white-100 text-[14px] mt-2'>{experience.date}</p>

          <ul className='mt-4 list-disc ml-5 space-y-2'>
            {experience.points.map((point, index) => (
              <li
                key={`experience-point-${index}`}
                className='text-white-100 text-[14px] pl-1 tracking-wider'
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  return (
    <div className='mt-20'>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        
        <h2 className='text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]'>
          My Experience..
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-wrap gap-10 justify-center'>
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={`experience-${index}`}
            experience={experience}
          />
        ))}
      </div>
    </div>
  );
};

export default Experience;