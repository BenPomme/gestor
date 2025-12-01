'use client';

import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/DashboardLayout';
import {
  FileText,
  CheckSquare,
  Clock,
  AlertCircle,
  Upload,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { t } = useTranslation();

  // Mock data - replace with actual API calls
  const stats = [
    { name: 'Documents', value: 12, icon: FileText, href: '/documents' },
    { name: 'Pending Tasks', value: 5, icon: CheckSquare, href: '/tasks' },
    { name: 'Upcoming Deadlines', value: 3, icon: Clock, href: '/tasks' },
  ];

  const recentDocuments = [
    {
      id: '1',
      name: 'Multa DGT - Exceso velocidad',
      type: 'Traffic Fine',
      status: 'processed',
      deadline: '2024-12-15',
      amount: '100€',
    },
    {
      id: '2',
      name: 'Certificado Padrón',
      type: 'Padrón',
      status: 'processed',
      deadline: null,
      amount: null,
    },
    {
      id: '3',
      name: 'Notificación Agencia Tributaria',
      type: 'Tax Notice',
      status: 'processing',
      deadline: '2024-12-20',
      amount: null,
    },
  ];

  const upcomingTasks = [
    {
      id: '1',
      title: 'Pay traffic fine (with 50% discount)',
      dueDate: '2024-12-15',
      priority: 'high',
      process: 'Traffic Fine',
    },
    {
      id: '2',
      title: 'Respond to tax notice',
      dueDate: '2024-12-20',
      priority: 'urgent',
      process: 'Tax Notice',
    },
    {
      id: '3',
      title: 'Renew padrón',
      dueDate: '2025-01-15',
      priority: 'medium',
      process: 'Padrón',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.welcome')}</h1>
            <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your documents</p>
          </div>
          <Link
            href="/documents"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            <Upload className="h-5 w-5" />
            {t('documents.upload')}
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <stat.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Documents */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">{t('dashboard.recentDocuments')}</h2>
              <Link
                href="/documents"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recentDocuments.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/documents/${doc.id}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {doc.amount && (
                      <span className="text-sm font-medium text-gray-900">{doc.amount}</span>
                    )}
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}
                    >
                      {doc.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">{t('dashboard.upcomingDeadlines')}</h2>
              <Link
                href="/tasks"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {upcomingTasks.map((task) => (
                <Link
                  key={task.id}
                  href={`/tasks/${task.id}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        task.priority === 'urgent' ? 'bg-red-100' : 'bg-gray-100'
                      }`}
                    >
                      {task.priority === 'urgent' ? (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      ) : (
                        <CheckSquare className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{task.title}</p>
                      <p className="text-xs text-gray-500">{task.process}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {task.dueDate}
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Need help with a document?</h3>
          <p className="text-indigo-100 mb-4">
            Our AI assistant can help you understand any official letter or guide you through
            Spanish bureaucracy.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition"
          >
            Start Chat <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
