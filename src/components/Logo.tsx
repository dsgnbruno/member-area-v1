import React from 'react';

interface LogoProps {
  theme: string;
}

const Logo: React.FC<LogoProps> = ({ theme }) => {
  // Use different PNG based on theme
  const logoSrc = theme === 'dark' 
    ? 'https://brunofaria.com/wp-content/uploads/2025/03/logo-icon-white.png'
    : 'https://brunofaria.com/wp-content/uploads/2025/03/logo-icon-dark.png';
  
  return (
    <div className="w-24 h-8 mr-2 flex items-center" aria-label="Learning Portal Logo">
      <img 
        src={logoSrc} 
        alt="Learning Portal Logo" 
        className="h-full object-contain"
      />
    </div>
  );
}

export default Logo;
