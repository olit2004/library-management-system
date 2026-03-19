import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  loading = false,
  disabled,
  ...props 
}) => {
  const baseStyles = "px-6 py-2.5 rounded-lg font-medium transition-all cursor-pointer duration-200 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]";
  
  const variants = {
    primary: "bg-[#008080] hover:bg-[#006666] text-white shadow-sm",
    secondary: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
    outline: "border-2 border-[#008080] text-[#008080] hover:bg-[#008080] hover:text-white",
    danger: "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;