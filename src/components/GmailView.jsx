import React, { useState } from 'react'
import './GmailView.css'

function GmailView({ onEmailSelect }) {
  const [selectedEmailId, setSelectedEmailId] = useState(null);

  const emails = [
    {
      id: 1,
      subject: "Re: Emergent Sh Deal Review - Next Steps",
      sender: "john.smith@emergentsh.com",
      preview: "Following up on our discovery call, here are the key points we discussed regarding the $4,550 proposal...",
      timestamp: "10:35am",
      label: "Work",
      dealContext: {
        dealName: "Emergent Sh",
        amount: "$4,550",
        stage: "SALES QUALIFIED",
        type: "Follow-up"
      }
    },
    {
      id: 2,
      subject: "TechCorp Solutions - POC Timeline and Success Criteria",
      sender: "sarah.tech@techcorp.com",
      preview: "Thank you for the demo session. Attached is the POC success criteria document for the $12,000 engagement...",
      timestamp: "Sep 30",
      dealContext: {
        dealName: "TechCorp Solutions",
        amount: "$12,000",
        stage: "POC",
        type: "POC Discussion"
      }
    }
  ];

  const handleEmailClick = (email) => {
    setSelectedEmailId(email.id);
    onEmailSelect({
      type: 'email',
      id: email.id,
      subject: email.subject,
      sender: email.sender,
      dealContext: email.dealContext
    });
  };

  return (
    <div className="gmail-container">
      <button className="compose-button">+ Compose</button>
      
      <div className="email-list">
        {emails.map((email) => (
          <div 
            key={email.id}
            className={`email-item ${selectedEmailId === email.id ? 'selected' : ''}`}
            onClick={() => handleEmailClick(email)}
          >
            <div className="email-header">
              <span className="sender">{email.sender}</span>
              <span className="timestamp">
                {email.label && <span className="label">{email.label}</span>}
                {email.timestamp}
              </span>
            </div>
            <div className="email-subject">{email.subject}</div>
            <div className="email-preview">{email.preview}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GmailView 