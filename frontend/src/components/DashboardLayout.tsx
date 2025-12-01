'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  LayoutDashboard,
  FileText,
  CheckSquare,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Globe,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
  };

  const navigation = [
    { name: t('nav.home'), href: '/dashboard', icon: LayoutDashboard },
    { name: t('nav.documents'), href: '/documents', icon: FileText },
    { name: t('nav.tasks'), href: '/tasks', icon: CheckSquare },
    { name: t('nav.family'), href: '/family', icon: Users },
    { name: t('nav.chat'), href: '/chat', icon: MessageSquare },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-indigo-600" />
              <span className="text-lg font-bold text-gray-900">Gestoría Copilot</span>
            </Link>
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive(item.href)
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Bottom section */}
          <div className="border-t border-gray-200 p-4 space-y-3">
            {/* Language selector */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Globe className="h-4 w-4 text-gray-500 ml-2" />
              {['en', 'es', 'ca'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`flex-1 px-2 py-1 text-xs rounded ${
                    currentLang === lang
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <Link
              href="/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              <Settings className="h-5 w-5" />
              {t('nav.settings')}
            </Link>
            <button
              onClick={() => {
                // TODO: Implement logout
                window.location.href = '/';
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition w-full"
            >
              <LogOut className="h-5 w-5" />
              {t('nav.logout')}
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-16">
          <div className="flex items-center justify-between h-full px-4">
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* User info placeholder */}
            <div className="flex items-center gap-4 ml-auto">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-600">U</span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
