import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';

const AnimatedLogo = ({ isVisible = true }) => {
  if (!isVisible) return null;
  
  return (
    <div className="flex flex-col items-center justify-center py-4 w-full">
      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl mb-4 shadow-blue-500/20 transform hover:scale-105 transition-all">
        <FaGraduationCap className="w-10 h-10" />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-black text-white tracking-tighter leading-none mb-1 text-center">GAS</h1>
        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.3em] text-center">Management System</p>
      </div>
    </div>
  );
};

export default AnimatedLogo;