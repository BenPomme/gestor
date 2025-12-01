'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Users,
  Plus,
  User,
  Calendar,
  FileText,
  CheckSquare,
  MoreVertical,
  Edit,
  Trash2,
  X,
} from 'lucide-react';

interface Dependent {
  id: string;
  name: string;
  relationship: string;
  birthdate: string | null;
  nieOrPassport: string | null;
  padronStatus: 'registered' | 'not_registered' | 'expired' | 'pending';
  padronDate: string | null;
  documentsCount: number;
  tasksCount: number;
}

export default function FamilyPage() {
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDependent, setNewDependent] = useState({
    name: '',
    relationship: 'spouse',
    birthdate: '',
    nieOrPassport: '',
  });

  // Mock data
  const dependents: Dependent[] = [
    {
      id: '1',
      name: 'Ana García',
      relationship: 'spouse',
      birthdate: '1988-05-15',
      nieOrPassport: 'Y1234567X',
      padronStatus: 'registered',
      padronDate: '2024-01-15',
      documentsCount: 3,
      tasksCount: 1,
    },
    {
      id: '2',
      name: 'María García',
      relationship: 'child',
      birthdate: '2018-09-22',
      nieOrPassport: null,
      padronStatus: 'registered',
      padronDate: '2024-01-15',
      documentsCount: 2,
      tasksCount: 2,
    },
    {
      id: '3',
      name: 'Pablo García',
      relationship: 'child',
      birthdate: '2021-03-10',
      nieOrPassport: null,
      padronStatus: 'pending',
      padronDate: null,
      documentsCount: 0,
      tasksCount: 1,
    },
  ];

  const getPadronStatusBadge = (status: string) => {
    switch (status) {
      case 'registered':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'expired':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRelationshipLabel = (relationship: string) => {
    const labels: Record<string, string> = {
      spouse: t('family.spouse'),
      partner: t('family.partner'),
      child: t('family.child'),
      parent: t('family.parent'),
      sibling: t('family.sibling'),
      other: t('family.other'),
    };
    return labels[relationship] || relationship;
  };

  const handleAddDependent = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual API call
    console.log('Adding dependent:', newDependent);
    setShowAddModal(false);
    setNewDependent({ name: '', relationship: 'spouse', birthdate: '', nieOrPassport: '' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('family.members')}</h1>
            <p className="text-gray-500 mt-1">
              Manage your household and track documents for each family member
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            <Plus className="h-5 w-5" />
            {t('family.addMember')}
          </button>
        </div>

        {/* Family Members Grid */}
        {dependents.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No family members added yet</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              <Plus className="h-5 w-5" />
              {t('family.addMember')}
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dependents.map((dependent) => (
              <div
                key={dependent.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{dependent.name}</h3>
                        <p className="text-sm text-gray-500">
                          {getRelationshipLabel(dependent.relationship)}
                        </p>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>

                  <div className="mt-4 space-y-3">
                    {dependent.birthdate && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Born: {dependent.birthdate}</span>
                      </div>
                    )}
                    {dependent.nieOrPassport && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span>NIE: {dependent.nieOrPassport}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Padrón:</span>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPadronStatusBadge(dependent.padronStatus)}`}
                      >
                        {dependent.padronStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <FileText className="h-4 w-4" />
                        <span>{dependent.documentsCount}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <CheckSquare className="h-4 w-4" />
                        <span>{dependent.tasksCount}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Padrón Familiar Info */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Padrón Familiar</h3>
          <p className="text-purple-100 mb-4">
            Need to register your whole family at once? We can generate a checklist with all
            required documents for each family member.
          </p>
          <button className="inline-flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition">
            Generate Family Checklist
          </button>
        </div>

        {/* Add Dependent Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">{t('family.addMember')}</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <form onSubmit={handleAddDependent} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={newDependent.name}
                    onChange={(e) => setNewDependent({ ...newDependent, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('family.relationship')}
                  </label>
                  <select
                    value={newDependent.relationship}
                    onChange={(e) =>
                      setNewDependent({ ...newDependent, relationship: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="spouse">{t('family.spouse')}</option>
                    <option value="partner">{t('family.partner')}</option>
                    <option value="child">{t('family.child')}</option>
                    <option value="parent">{t('family.parent')}</option>
                    <option value="sibling">{t('family.sibling')}</option>
                    <option value="other">{t('family.other')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={newDependent.birthdate}
                    onChange={(e) =>
                      setNewDependent({ ...newDependent, birthdate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    NIE / Passport (optional)
                  </label>
                  <input
                    type="text"
                    value={newDependent.nieOrPassport}
                    onChange={(e) =>
                      setNewDependent({ ...newDependent, nieOrPassport: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Y1234567X"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                  >
                    {t('common.save')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
