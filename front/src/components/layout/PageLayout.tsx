import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  headerContent?: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  background?: 'default' | 'gradient' | 'white' | 'gray';
}

export default function PageLayout({
  children,
  title,
  subtitle,
  showHeader = true,
  headerContent,
  // className = '',
  maxWidth = 'xl',
  padding = 'md',
  background = 'default'
}: PageLayoutProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl',
    full: 'max-w-full'
  };
  
  const paddingClasses = {
    none: '',
    sm: 'px-4 py-6',
    md: 'px-6 py-8',
    lg: 'px-8 py-12'
  };
  
  // const backgroundClasses = {
  //   default: 'min-h-screen bg-gradient-to-br from-green-500 to-blue-500',
  //   gradient: 'min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600',
  //   white: 'min-h-screen bg-white',
  //   gray: 'min-h-screen bg-gray-50'
  // };
  
  return (
    <div>
      <div className={`mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]}`}>
        {showHeader && (title || subtitle || headerContent) && (
          <div className="mb-8">
            {headerContent}
            {title && (
              <h1 className={`text-4xl font-bold mb-2 ${
                background === 'white' || background === 'gray' ? 'text-gray-900' : 'text-white'
              }`}>
                {title}
              </h1>
            )}
            {subtitle && (
              <p className={`text-xl ${
                background === 'white' || background === 'gray' ? 'text-gray-600' : 'text-white/80'
              }`}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
