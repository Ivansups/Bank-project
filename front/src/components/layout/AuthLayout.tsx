import { ReactNode } from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showBackButton?: boolean;
  backButtonHref?: string;
  footer?: ReactNode;
  className?: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  showLogo = true,
  showBackButton = false,
  backButtonHref = '/',
  footer,
  className = ''
}: AuthLayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-500 to-blue-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ${className}`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {showBackButton && (
          <div className="mb-6">
            <Link
              href={backButtonHref}
              className="inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Назад
            </Link>
          </div>
        )}
        
        {showLogo && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Bank App</h1>
            <p className="mt-2 text-white/80">Безопасный банковский сервис</p>
          </div>
        )}
        
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          {(title || subtitle) && (
            <div className="mb-6">
              {title && (
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-sm text-gray-600 text-center">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          
          {children}
          
          {footer && (
            <div className="mt-6">
              {footer}
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-white/80">
            © 2024 Bank App. Все права защищены.
          </p>
        </div>
      </div>
    </div>
  );
}
