import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='canvas-loader'></div>
    </div>
  );
};

export default Loader;