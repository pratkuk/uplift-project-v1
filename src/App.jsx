import { useState } from 'react'
import './App.css'
import HubspotView from './components/HubspotView'
import GmailView from './components/GmailView'
import DealhubView from './components/DealhubView'
import ChatWidget from './components/ChatWidget'

function App() {
  const [activeTab, setActiveTab] = useState('hubspot')
  const [selectedItem, setSelectedItem] = useState(null)

  const handleDealSelect = (deal) => {
    console.log('Deal selected:', deal)
    setSelectedItem({
      type: 'deal',
      ...deal
    })
  }

  const handleEmailSelect = (email) => {
    console.log('Email selected:', email)
    setSelectedItem({
      type: 'email',
      ...email
    })
  }

  const handleProposalSelect = (proposal) => {
    console.log('Proposal selected:', proposal)
    setSelectedItem({
      type: 'proposal',
      ...proposal
    })
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="app-container">
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'hubspot' ? 'active' : ''}`}
          onClick={() => handleTabChange('hubspot')}
        >
          Hubspot Deals
        </button>
        <button 
          className={`tab ${activeTab === 'gmail' ? 'active' : ''}`}
          onClick={() => handleTabChange('gmail')}
        >
          Gmail Inbox
        </button>
        <button 
          className={`tab ${activeTab === 'dealhub' ? 'active' : ''}`}
          onClick={() => handleTabChange('dealhub')}
        >
          Deal Pipeline
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'hubspot' && <HubspotView onDealSelect={handleDealSelect} />}
        {activeTab === 'gmail' && <GmailView onEmailSelect={handleEmailSelect} />}
        {activeTab === 'dealhub' && <DealhubView onProposalSelect={handleProposalSelect} />}
      </div>

      <ChatWidget 
        activeTab={activeTab} 
        selectedItem={selectedItem}
        onTabRevert={handleTabChange}
        onItemClear={() => setSelectedItem(null)}
      />
    </div>
  )
}

export default App 