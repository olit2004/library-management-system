import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-2.5 rounded-lg font-medium transition-all cursor-pointer duration-200 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#008080] hover:bg-[#006666] text-white shadow-sm",
    secondary: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
    outline: "border-2 border-[#008080] text-[#008080] hover:bg-[#008080] hover:text-white",
    danger: "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;