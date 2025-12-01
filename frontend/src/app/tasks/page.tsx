'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/DashboardLayout';
import {
  CheckSquare,
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle,
  Filter,
  Plus,
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  process: string;
  dependentName: string | null;
}

export default function TasksPage() {
  const { t } = useTranslation();
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // Mock data
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Pay traffic fine (with 50% discount)',
      description: 'Multa DGT - Exceso velocidad on A-2',
      dueDate: '2024-12-15',
      status: 'pending',
      priority: 'high',
      process: 'Traffic Fine',
      dependentName: null,
    },
    {
      id: '2',
      title: 'Respond to tax notice',
      description: 'Notificación from Agencia Tributaria requires response',
      dueDate: '2024-12-20',
      status: 'pending',
      priority: 'urgent',
      process: 'Tax Notice',
      dependentName: null,
    },
    {
      id: '3',
      title: 'Renew padrón',
      description: 'Annual padrón renewal at Ayuntamiento',
      dueDate: '2025-01-15',
      status: 'pending',
      priority: 'medium',
      process: 'Padrón',
      dependentName: null,
    },
    {
      id: '4',
      title: 'Update child school registration',
      description: 'Bring new padrón certificate to school',
      dueDate: '2025-01-20',
      status: 'pending',
      priority: 'low',
      process: 'Padrón',
      dependentName: 'Maria (child)',
    },
    {
      id: '5',
      title: 'File Modelo 720',
      description: 'Annual foreign assets declaration',
      dueDate: '2025-03-31',
      status: 'pending',
      priority: 'medium',
      process: 'Tax Filing',
      dependentName: null,
    },
    {
      id: '6',
      title: 'Padrón registration completed',
      description: 'Successfully registered at Barcelona Ayuntamiento',
      dueDate: null,
      status: 'completed',
      priority: 'medium',
      process: 'Padrón',
      dependentName: null,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <CheckSquare className="h-5 w-5 text-gray-400" />;
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

  const pendingCount = tasks.filter((t) => t.status !== 'completed').length;
  const urgentCount = tasks.filter((t) => t.priority === 'urgent' && t.status !== 'completed').length;

  const getDaysUntil = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('nav.tasks')}</h1>
            <p className="text-gray-500 mt-1">
              {pendingCount} pending tasks{urgentCount > 0 && `, ${urgentCount} urgent`}
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
            <Plus className="h-5 w-5" />
            Add Task
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: t('tasks.all'), value: tasks.length, color: 'bg-gray-100' },
            { label: t('tasks.pending'), value: tasks.filter((t) => t.status === 'pending').length, color: 'bg-yellow-100' },
            { label: t('tasks.inProgress'), value: tasks.filter((t) => t.status === 'in_progress').length, color: 'bg-blue-100' },
            { label: t('tasks.completed'), value: tasks.filter((t) => t.status === 'completed').length, color: 'bg-green-100' },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.color} rounded-xl p-4`}>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">Filter:</span>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="pending">{t('tasks.pending')}</option>
            <option value="in_progress">{t('tasks.inProgress')}</option>
            <option value="completed">{t('tasks.completed')}</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <CheckSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">{t('tasks.noTasks')}</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition ${
                  task.status === 'completed' ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <button className="mt-1">{getStatusIcon(task.status)}</button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        className={`font-medium ${
                          task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}
                      >
                        {task.title}
                      </h3>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}
                      >
                        {task.priority}
                      </span>
                      {task.dependentName && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                          {task.dependentName}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        {task.process}
                      </span>
                      {task.dueDate && (
                        <span
                          className={`text-xs flex items-center gap-1 ${
                            getDaysUntil(task.dueDate) <= 7
                              ? 'text-red-600 font-medium'
                              : 'text-gray-500'
                          }`}
                        >
                          <Calendar className="h-3 w-3" />
                          {task.dueDate}
                          {getDaysUntil(task.dueDate) <= 7 && task.status !== 'completed' && (
                            <AlertCircle className="h-3 w-3 ml-1" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
