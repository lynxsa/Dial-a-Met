'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { 
  CreditCard, 
  Download,
  DollarSign,
  FileText,
  Eye,
  AlertCircle,
  CheckCircle,
  Plus,
  Search
} from 'lucide-react'

interface Invoice {
  id: string
  date: string
  amount: number
  status: 'Paid' | 'Pending' | 'Overdue'
  description: string
  downloadUrl?: string
}

interface Subscription {
  plan: string
  price: number
  billing: 'monthly' | 'yearly'
  nextBilling: string
  status: 'active' | 'cancelled'
}

const mockInvoices: Invoice[] = [
  {
    id: 'INV-2024-001',
    date: '2024-01-15',
    amount: 299,
    status: 'Paid',
    description: 'Professional Plan - January 2024',
    downloadUrl: '#'
  },
  {
    id: 'INV-2024-002',
    date: '2024-02-15',
    amount: 299,
    status: 'Paid',
    description: 'Professional Plan - February 2024',
    downloadUrl: '#'
  },
  {
    id: 'INV-2024-003',
    date: '2024-03-15',
    amount: 299,
    status: 'Pending',
    description: 'Professional Plan - March 2024'
  }
]

const subscription: Subscription = {
  plan: 'Professional',
  price: 299,
  billing: 'monthly',
  nextBilling: '2024-04-15',
  status: 'active'
}

export default function BillingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('all')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'Overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle className="w-4 h-4" />
      case 'Pending':
      case 'Overdue':
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Billing & Payments</h1>
            <p className="text-slate-600 dark:text-slate-400">Manage your subscription and payment history</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Payment Method</span>
          </button>
        </div>

        {/* Current Subscription */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Current Subscription</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              subscription.status === 'active' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{subscription.plan} Plan</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Perfect for growing mining operations</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-blue-600">${subscription.price}</span>
                <span className="text-slate-600 dark:text-slate-400">/{subscription.billing === 'monthly' ? 'month' : 'year'}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Next billing date:</span>
                <span className="font-medium text-slate-900 dark:text-white">{subscription.nextBilling}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Billing cycle:</span>
                <span className="font-medium text-slate-900 dark:text-white capitalize">{subscription.billing}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Payment method:</span>
                <span className="font-medium text-slate-900 dark:text-white">•••• 4242</span>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Upgrade Plan
              </button>
              <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                Manage Plan
              </button>
              <button className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Payment Methods</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Add New Method
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Visa ending in 4242</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Expires 12/2025</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full">
                  Default
                </span>
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Billing History</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  className="pl-10 pr-4 py-2 w-64 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All time</option>
                <option value="current">Current year</option>
                <option value="last">Last year</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Invoice</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span className="font-medium text-slate-900 dark:text-white">{invoice.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      {new Date(invoice.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      {invoice.description}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-slate-900 dark:text-white">${invoice.amount}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        <span>{invoice.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        {invoice.downloadUrl && (
                          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Usage & Credits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Current Usage</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 dark:text-slate-400">API Calls</span>
                  <span className="text-slate-900 dark:text-white font-medium">8,432 / 10,000</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 dark:text-slate-400">Storage</span>
                  <span className="text-slate-900 dark:text-white font-medium">45 GB / 100 GB</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600 dark:text-slate-400">Projects</span>
                  <span className="text-slate-900 dark:text-white font-medium">12 / 25</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '48%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Account Credits</h3>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">$127.50</p>
              <p className="text-slate-600 dark:text-slate-400 mb-4">Available credits</p>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Add Credits
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
