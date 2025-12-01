'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FileText,
  MessageSquare,
  Users,
  CheckSquare,
  Shield,
  Globe,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
  };

  const features = [
    {
      icon: FileText,
      title: 'Document AI',
      description: 'Upload any official letter or form. Our AI extracts key information, deadlines, and required actions.',
    },
    {
      icon: MessageSquare,
      title: 'Chat Assistant',
      description: 'Ask questions in your language. Get clear explanations about Spanish bureaucracy.',
    },
    {
      icon: Users,
      title: 'Family Management',
      description: 'Track documents and tasks for your entire household. Manage padrón familiar easily.',
    },
    {
      icon: CheckSquare,
      title: 'Smart Reminders',
      description: 'Never miss a deadline. Automatic task creation from your documents.',
    },
  ];

  const processes = [
    { name: 'Padrón', description: 'Municipal registration' },
    { name: 'Beckham Law', description: 'Impatriate tax regime' },
    { name: 'Traffic Fines', description: 'DGT notifications' },
    { name: 'Tax Notices', description: 'Agencia Tributaria' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Gestoría Copilot</span>
            </div>
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <Globe className="h-4 w-4 text-gray-500 ml-2" />
                {['en', 'es', 'ca'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className={`px-2 py-1 text-sm rounded ${
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
                href="/login"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                {t('auth.login')}
              </Link>
              <Link
                href="/signup"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                {t('auth.signup')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t('app.tagline')}
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Upload official letters, get instant explanations, checklists, and deadlines.
              In English, Spanish, or Catalan.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/signup"
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition flex items-center gap-2"
              >
                Get Started Free <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/demo"
                className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                See Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need for Spanish bureaucracy
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stop struggling with confusing official letters. Our AI understands them for you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Processes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Processes we support
            </h2>
            <p className="text-lg text-gray-600">
              From padrón to Beckham law, we&apos;ve got you covered.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processes.map((process) => (
              <div
                key={process.name}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{process.name}</h3>
                <p className="text-gray-500">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to simplify your Spanish paperwork?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Start free. Upload your first document and see the magic.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition text-lg"
          >
            Start Free Trial <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-indigo-400" />
              <span className="text-white font-semibold">Gestoría Copilot</span>
            </div>
            <p className="text-sm">
              © 2024 Gestoría Copilot. Your AI-powered gestoría for Spain.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
