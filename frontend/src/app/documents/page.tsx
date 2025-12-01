'use client';

import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/DashboardLayout';
import {
  FileText,
  Upload,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

export default function DocumentsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Mock data - replace with actual API calls
  const documents = [
    {
      id: '1',
      name: 'Multa DGT - Exceso velocidad',
      type: 'traffic_fine',
      typeName: 'Traffic Fine',
      status: 'processed',
      language: 'es',
      deadline: '2024-12-15',
      amount: 100,
      createdAt: '2024-11-28',
      summary: 'Speeding fine on A-2 highway. 50% discount if paid within 20 days.',
    },
    {
      id: '2',
      name: 'Certificado Padrón Municipal',
      type: 'padron_certificate',
      typeName: 'Padrón',
      status: 'processed',
      language: 'es',
      deadline: null,
      amount: null,
      createdAt: '2024-11-25',
      summary: 'Certificate of municipal registration. Valid until 2025-11-25.',
    },
    {
      id: '3',
      name: 'Notificación Agencia Tributaria',
      type: 'tax_notice',
      typeName: 'Tax Notice',
      status: 'processing',
      language: 'es',
      deadline: '2024-12-20',
      amount: null,
      createdAt: '2024-11-30',
      summary: null,
    },
    {
      id: '4',
      name: 'Modelo 149 - Beckham',
      type: 'beckham_notification',
      typeName: 'Beckham Law',
      status: 'processed',
      language: 'es',
      deadline: null,
      amount: null,
      createdAt: '2024-10-15',
      summary: 'Beckham law application accepted. Special tax regime active.',
    },
    {
      id: '5',
      name: 'Documento escaneado',
      type: 'other',
      typeName: 'Unknown',
      status: 'error',
      language: null,
      deadline: null,
      amount: null,
      createdAt: '2024-11-29',
      summary: null,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
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

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleUpload(files);
  }, []);

  const handleUpload = async (files: File[]) => {
    setIsUploading(true);
    // TODO: Implement actual upload
    console.log('Uploading files:', files);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsUploading(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('nav.documents')}</h1>
            <p className="text-gray-500 mt-1">Upload and manage your official documents</p>
          </div>
        </div>

        {/* Upload Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
              <p className="text-gray-600">{t('documents.processing')}</p>
            </div>
          ) : (
            <>
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Drag and drop your documents here, or{' '}
                <label className="text-indigo-600 hover:text-indigo-700 cursor-pointer font-medium">
                  browse
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files) {
                        handleUpload(Array.from(e.target.files));
                      }
                    }}
                  />
                </label>
              </p>
              <p className="text-sm text-gray-400">{t('documents.uploadDescription')}</p>
            </>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="processed">{t('documents.processed')}</option>
              <option value="processing">{t('documents.processing')}</option>
              <option value="error">{t('documents.error')}</option>
            </select>
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {filteredDocuments.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">{t('documents.noDocuments')}</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredDocuments.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/documents/${doc.id}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <FileText className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusBadge(doc.status)}`}
                        >
                          {doc.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-500">{doc.typeName}</span>
                        <span className="text-sm text-gray-400">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          {doc.createdAt}
                        </span>
                        {doc.deadline && (
                          <span className="text-sm text-orange-600 font-medium">
                            Due: {doc.deadline}
                          </span>
                        )}
                      </div>
                      {doc.summary && (
                        <p className="text-sm text-gray-500 mt-1 truncate">{doc.summary}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    {doc.amount && (
                      <span className="text-lg font-semibold text-gray-900">{doc.amount}€</span>
                    )}
                    {getStatusIcon(doc.status)}
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
