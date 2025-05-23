import React from 'react';
import { motion } from 'framer-motion';
import { services } from '../constants';

interface ServiceCardProps {
  index: number;
  title: string;
  icon: React.ElementType;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ index, title, icon: Icon }) => (
  <motion.div
    variants={{
      hidden: { y: 100, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    }}
    className='xs:w-[250px] w-full'
  >
    <div
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <Icon className='text-white w-16 h-16 object-contain' />
        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </div>
  </motion.div>
);

const About: React.FC = () => {
  return (
    <div className='mt-20'>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className='sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider'>Introduction</p>
        <h2 className='text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]'>About Me.</h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I'm a detail-oriented Computer Science Graduate (M-Tech) with expertise in full-stack development, 
        mobile app development, and data science. Proficient in HTML, CSS, JavaScript, React, Node.js, Python, 
        Java, and Android Studio. I'm passionate about building scalable, user-friendly applications and 
        solving real-world problems through technology. With strong problem-solving skills, adaptability, 
        and a collaborative mindset, I'm seeking a Front-End Developer role to leverage my technical skills 
        in a dynamic environment.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10 justify-center'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default About;