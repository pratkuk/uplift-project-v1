import React, { useState } from 'react'
import './HubspotView.css'

function HubspotView({ onDealSelect }) {
  const [selectedDealId, setSelectedDealId] = useState(null);

  const metrics = [
    { title: 'TOTAL DEAL AMOUNT', amount: '$1.92M', average: '$5.7K' },
    { title: 'WEIGHTED DEAL AMOUNT', amount: '$772.34K', average: '$2.29K' },
    { title: 'OPEN DEAL AMOUNT', amount: '$663K', average: '$6.56K' },
    { title: 'CLOSED DEAL AMOUNT', amount: '$650.89K', average: '$4.72K' },
    { title: 'NEW DEAL AMOUNT', amount: '$0', average: '$0' }
  ]

  const stages = [
    { 
      name: 'SALES QUALIFIED', 
      count: 1,
      deals: [{
        name: 'Emergent Sh',
        amount: '$4,550',
        closeDate: '12/13/2024',
        lastMeeting: '9 days ago',
        activityStatus: 'No activity scheduled'
      }]
    },
    { name: 'DEMO', count: 0, deals: [] },
    { 
      name: 'POC', 
      count: 1,
      deals: [{
        name: 'TechCorp Solutions',
        amount: '$12,000',
        closeDate: '11/30/2024',
        lastMeeting: '2 days ago',
        activityStatus: 'Demo scheduled next week'
      }]
    },
    { name: 'PROPOSAL', count: 0, deals: [] },
    { name: 'NEGOTIATION', count: 0, deals: [] },
    { 
      name: 'MSA/LEGAL', 
      count: 1,
      deals: [{
        name: 'Persist AI by OptIO',
        amount: '$4,000',
        closeDate: '12/12/2024',
        lastMeeting: '40 minutes ago',
        activityStatus: 'Contract review pending'
      }]
    }
  ]

  const handleDealClick = (deal, stage) => {
    setSelectedDealId(deal.id);
    onDealSelect({
      type: 'deal',
      id: deal.id,
      name: deal.name,
      amount: deal.amount,
      stage: stage.name,
      closeDate: deal.closeDate,
      lastActivity: deal.lastMeeting,
      activityStatus: deal.activityStatus,
      probability: stage.name === 'SALES QUALIFIED' ? '30%' : 
                  stage.name === 'POC' ? '60%' : 
                  stage.name === 'MSA/LEGAL' ? '90%' : '0%',
      daysInStage: Math.floor(Math.random() * 30),
      nextSteps: deal.activityStatus
    });
  };

  return (
    <div className="hubspot-container">
      <div className="deals-header">
        <div className="deals-metrics">
          {metrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <h3>{metric.title}</h3>
              <div className="amount">{metric.amount}</div>
              <div className="sub-text">Average per deal: {metric.average}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pipeline-container">
        {stages.map((stage, index) => (
          <div key={index} className="pipeline-stage">
            <div className="stage-header">
              <span>{stage.name}</span>
              <span className="stage-count">{stage.count}</span>
            </div>
            {stage.deals.map((deal) => (
              <div 
                key={deal.id} 
                className={`deal-card ${selectedDealId === deal.id ? 'selected' : ''}`}
                onClick={() => handleDealClick(deal, stage)}
                style={{ cursor: 'pointer' }}
              >
                <h4>{deal.name}</h4>
                <div className="deal-details">
                  <div>Amount in company currency:</div>
                  <div className="deal-amount">{deal.amount}</div>
                  <div>Close date: {deal.closeDate}</div>
                </div>
                <div className="deal-meta">
                  <div className="meeting-info">Meeting {deal.lastMeeting}</div>
                  <div className="activity-status">{deal.activityStatus}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HubspotView
