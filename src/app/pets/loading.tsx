// loading.tsx

import React from 'react';
import Image from 'next/image';

const Loading: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="border-4 border-white border-opacity-30 rounded-full w-16 h-16 flex justify-center items-center">
        <p>loading</p>
      </div>
    </div>
  );
};

export default Loading;
