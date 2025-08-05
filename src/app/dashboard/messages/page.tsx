'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { 
  MessageSquare, 
  Search, 
  Filter, 
  MoreVertical,
  Send,
  Paperclip,
  Star,
  Archive,
  Trash2
} from 'lucide-react'

interface Message {
  id: string
  sender: {
    name: string
    avatar: string
    role: string
  }
  subject: string
  preview: string
  timestamp: string
  isRead: boolean
  isStarred: boolean
  attachments?: number
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: {
      name: 'Sarah Mitchell',
      avatar: '/api/placeholder/40/40',
      role: 'Mining Consultant'
    },
    subject: 'Project Update: Copper Mine Analysis',
    preview: 'I\'ve completed the initial assessment of the copper deposits. The preliminary results look very promising...',
    timestamp: '2 hours ago',
    isRead: false,
    isStarred: true,
    attachments: 3
  },
  {
    id: '2',
    sender: {
      name: 'Mike Johnson',
      avatar: '/api/placeholder/40/40',
      role: 'Project Manager'
    },
    subject: 'Timeline Adjustment Request',
    preview: 'Due to weather conditions, we need to adjust the project timeline. Please review the updated schedule...',
    timestamp: '5 hours ago',
    isRead: false,
    isStarred: false
  },
  {
    id: '3',
    sender: {
      name: 'Lisa Zhang',
      avatar: '/api/placeholder/40/40',
      role: 'Geological Engineer'
    },
    subject: 'Soil Sample Results',
    preview: 'The soil analysis results are ready. I\'ve attached the detailed report with recommendations...',
    timestamp: '1 day ago',
    isRead: true,
    isStarred: false,
    attachments: 1
  }
]

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredMessages = mockMessages.filter(message =>
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Messages</h1>
            <p className="text-slate-600 dark:text-slate-400">Communicate with your project team</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>New Message</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Messages List */}
          <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
            {/* Search and Filter */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center justify-between mt-3">
                <button className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <span className="text-sm text-slate-500">{filteredMessages.length} messages</span>
              </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 border-b border-slate-100 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-r-blue-600' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-sm">
                      {message.sender.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-medium truncate ${!message.isRead ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-700 dark:text-slate-300'}`}>
                          {message.sender.name}
                        </h4>
                        <div className="flex items-center space-x-1">
                          {message.isStarred && (
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          )}
                          {message.attachments && (
                            <Paperclip className="w-3 h-3 text-slate-400" />
                          )}
                        </div>
                      </div>
                      <p className={`text-sm truncate mt-1 ${!message.isRead ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
                        {message.subject}
                      </p>
                      <p className="text-xs text-slate-500 truncate mt-1">
                        {message.preview}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-slate-500">{message.timestamp}</span>
                        {!message.isRead && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message View */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
            {selectedMessage ? (
              <>
                {/* Message Header */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                        {selectedMessage.sender.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{selectedMessage.sender.name}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{selectedMessage.sender.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                        <Star className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                        <Archive className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{selectedMessage.subject}</h2>
                    <p className="text-sm text-slate-500 mt-1">{selectedMessage.timestamp}</p>
                  </div>
                </div>

                {/* Message Content */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p>
                      {selectedMessage.preview}
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>

                  {selectedMessage.attachments && (
                    <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      <h4 className="font-medium text-slate-900 dark:text-white mb-3">Attachments ({selectedMessage.attachments})</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600">
                          <Paperclip className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">geological-report.pdf</span>
                          <span className="text-xs text-slate-500">2.4 MB</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Reply Section */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-end space-x-3">
                    <div className="flex-1">
                      <textarea
                        placeholder="Type your reply..."
                        rows={3}
                        className="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No message selected</h3>
                  <p className="text-slate-600 dark:text-slate-400">Choose a message from the list to view its contents</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
