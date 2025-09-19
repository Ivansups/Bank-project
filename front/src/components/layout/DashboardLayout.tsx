import { ReactNode } from 'react';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: ReactNode;
  user?: {
    name?: string;
    isAdmin?: boolean;
  };
  onSignOut?: () => void;
  showSidebar?: boolean;
  sidebarItems?: Array<{
    label: string;
    href: string;
    icon?: ReactNode;
    active?: boolean;
  }>;
  className?: string;
}

export default function DashboardLayout({
  children,
  user,
  onSignOut,
  showSidebar = false,
  sidebarItems = [],
  className = ''
}: DashboardLayoutProps) {
  return (
    <div className={`flex flex-col min-h-screen ${className}`}>
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">Bank App</h1>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {user?.isAdmin && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Администратор
                </span>
              )}
              
              {user?.name && (
                <span className="text-sm text-gray-700">
                  Здравствуйте, {user.name}
                </span>
              )}
              
              {onSignOut && (
                <button
                  onClick={onSignOut}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Выйти
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex flex-1">
        {/* Sidebar */}
        {showSidebar && sidebarItems.length > 0 && (
          <aside className="w-64 bg-gray-50 border-r border-gray-200">
            <nav className="mt-5 px-2">
              <div className="space-y-1">
                {sidebarItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      item.active
                        ? 'bg-indigo-100 text-indigo-900'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {item.icon && (
                      <span className="mr-3 flex-shrink-0 h-5 w-5">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </aside>
        )}
        
        {/* Main Content */}
        <main className="flex-1 bg-gray-50">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
