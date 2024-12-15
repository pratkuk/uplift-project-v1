import React, { useState } from 'react'

function DealhubView({ onProposalSelect }) {
  const [selectedProposalId, setSelectedProposalId] = useState(null);

  const proposals = [
    {
      id: 1,
      name: "Emergent Sh",
      type: "Service Agreement",
      amount: "$4,550",
      status: "Draft",
      lastModified: "2 days ago",
      expiryDate: "12/13/2024",
      details: {
        dealStage: "SALES QUALIFIED",
        version: "1.0",
        owner: "John Smith",
        products: ["Professional Services", "Implementation"]
      }
    },
    {
      id: 2,
      name: "TechCorp Solutions",
      type: "Master Agreement",
      amount: "$12,000",
      status: "In Review",
      lastModified: "1 hour ago",
      expiryDate: "11/30/2024",
      details: {
        dealStage: "POC",
        version: "2.1",
        owner: "Sarah Tech",
        products: ["Enterprise License", "Support Package"]
      }
    },
    {
      id: 3,
      name: "Persist AI by OptIO",
      type: "License Agreement",
      amount: "$4,000",
      status: "Pending Approval",
      lastModified: "40 minutes ago",
      expiryDate: "12/12/2024",
      details: {
        dealStage: "MSA/LEGAL",
        version: "1.2",
        owner: "Mike Johnson",
        products: ["Basic License", "Maintenance"]
      }
    }
  ];

  const handleProposalClick = (proposal) => {
    console.log('Proposal clicked:', proposal); // Debug log
    setSelectedProposalId(proposal.id);
    onProposalSelect({
      type: 'proposal',
      id: proposal.id,
      name: proposal.name,
      amount: proposal.amount,
      status: proposal.status,
      proposalType: proposal.type,
      lastModified: proposal.lastModified,
      expiryDate: proposal.expiryDate,
      details: proposal.details
    });
  };

  return (
    <div className="dealhub-container">
      <div className="dealhub-header">
        <h2>Active Proposals</h2>
        <button className="new-proposal-btn">+ New Proposal</button>
      </div>

      <div className="proposals-list">
        {proposals.map((proposal) => (
          <div
            key={proposal.id}
            className={`proposal-card ${selectedProposalId === proposal.id ? 'selected' : ''}`}
            onClick={() => handleProposalClick(proposal)}
          >
            <div className="proposal-header">
              <h3>{proposal.name}</h3>
              <span className={`status-badge ${proposal.status.toLowerCase().replace(' ', '-')}`}>
                {proposal.status}
              </span>
            </div>
            
            <div className="proposal-details">
              <div className="detail-row">
                <span className="label">Type:</span>
                <span className="value">{proposal.type}</span>
              </div>
              <div className="detail-row">
                <span className="label">Amount:</span>
                <span className="value">{proposal.amount}</span>
              </div>
              <div className="detail-row">
                <span className="label">Modified:</span>
                <span className="value">{proposal.lastModified}</span>
              </div>
              <div className="detail-row">
                <span className="label">Expires:</span>
                <span className="value">{proposal.expiryDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DealhubView 