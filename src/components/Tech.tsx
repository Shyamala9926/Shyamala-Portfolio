import React from 'react';
import { BallCanvas } from './Canvas';
import { technologies } from '../constants';

const Tech: React.FC = () => {
  return (
    <div className='mt-20'>
     
      <h2 className='text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center mb-10'>
        My Skills.
      </h2>
      
      <div className='flex flex-row flex-wrap justify-center gap-10'>
        {technologies.map((technology) => (
          <div className='w-28 h-28' key={technology.name}>
            <BallCanvas icon={technology.icon} />
            <p className='text-white text-center mt-2'>{technology.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tech;