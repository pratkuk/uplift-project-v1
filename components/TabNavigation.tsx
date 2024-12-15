import { useState } from 'react';
import type { FC } from 'react';
import React from 'react';

type Tab = 'gmail' | 'hubspot' | 'dealhub';

const TabNavigation: FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('gmail');

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex gap-2 p-4 bg-white border-b">
        <button
          onClick={() => setActiveTab('gmail')}
          className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
            activeTab === 'gmail'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Gmail
        </button>
        <button
          onClick={() => setActiveTab('hubspot')}
          className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
            activeTab === 'hubspot'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Hubspot
        </button>
        <button
          onClick={() => setActiveTab('dealhub')}
          className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
            activeTab === 'dealhub'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Dealhub
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {activeTab === 'gmail' && <div>Gmail Content</div>}
        {activeTab === 'hubspot' && <div>Hubspot Content</div>}
        {activeTab === 'dealhub' && <div>Dealhub Content</div>}
      </div>
    </div>
  );
};

export default TabNavigation;