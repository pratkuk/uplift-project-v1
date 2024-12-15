import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';

function ChatWidget({ activeTab, selectedItem, onTabRevert, onItemClear }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 380, y: window.innerHeight - 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [inputValue, setInputValue] = useState('');
  const [showAgentsList, setShowAgentsList] = useState(false);
  const [currentContext, setCurrentContext] = useState(activeTab);
  const [showContextSwitchPrompt, setShowContextSwitchPrompt] = useState(false);
  const [pendingTab, setPendingTab] = useState(null);

  useEffect(() => {
    console.log('Selected item changed:', selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    if (currentContext !== activeTab) {
      if (selectedItem) {
        setShowContextSwitchPrompt(true);
        setPendingTab(activeTab);
      } else {
        setCurrentContext(activeTab);
      }
    }
  }, [activeTab]);

  const handleContextSwitch = (shouldSwitch) => {
    if (shouldSwitch) {
      onItemClear();
      setCurrentContext(pendingTab);
    } else {
      onTabRevert(currentContext);
    }
    setShowContextSwitchPrompt(false);
    setPendingTab(null);
  };

  const getContextualPrompts = () => {
    console.log('Getting prompts for:', selectedItem);

    if (selectedItem?.type === 'email') {
      const { dealContext } = selectedItem;
      
      if (!dealContext) {
        return [
          "Analyze email content",
          "Draft response",
          "Summarize key points",
          "Create action items"
        ];
      }

      switch (dealContext.type) {
        case 'Follow-up':
          return [
            `Analyze email thread for "${dealContext.dealName}" deal`,
            `Draft follow-up response for ${dealContext.amount} opportunity`,
            `Extract action items from discovery call`,
            `Generate meeting summary and next steps`,
            `Create follow-up timeline for ${dealContext.stage} stage`,
            `Draft stakeholder communication plan`
          ];

        case 'POC Discussion':
          return [
            `Review POC criteria from email for "${dealContext.dealName}"`,
            `Generate POC timeline based on discussion`,
            `Create success metrics tracking document`,
            `Draft technical requirements response`,
            `Prepare POC status update template`,
            `Analyze similar POC conversions`
          ];

        default:
          return [
            `Analyze email content for "${dealContext.dealName}"`,
            `Draft response for ${dealContext.amount} opportunity`,
            `Summarize key points and next steps`,
            `Create action items list`,
            `Generate follow-up schedule`
          ];
      }
    }

    if (selectedItem?.type === 'deal') {
      const deal = selectedItem;
      
      switch (deal.stage) {
        case 'SALES QUALIFIED':
          return [
            `Analyze qualification criteria for "${deal.name}"`,
            `Draft discovery call agenda for ${deal.amount} opportunity`,
            `Generate BANT assessment for ${deal.name}`,
            deal.activityStatus === 'No activity scheduled' 
              ? `Schedule initial discovery call with stakeholders`
              : `Prepare for upcoming meeting`,
            `Research similar qualified deals in this segment`,
            `Create stakeholder mapping template`
          ];

        case 'POC':
          return [
            `Review POC success criteria for "${deal.name}"`,
            `Generate POC timeline for ${deal.amount} deal`,
            deal.activityStatus.includes('Demo scheduled') 
              ? `Create demo preparation checklist`
              : `Draft POC success metrics document`,
            `Analyze similar POC conversions`,
            `Draft technical requirements document`,
            `Create POC evaluation framework`
          ];

        case 'MSA/LEGAL':
          return [
            `Review contract terms for "${deal.name}"`,
            `Generate redline summary for ${deal.amount} deal`,
            deal.activityStatus.includes('Contract review') 
              ? `Create contract review checklist`
              : `Draft contract negotiation points`,
            `Compare terms with similar deals`,
            `Create closing plan timeline`,
            `Draft executive summary for approval`
          ];

        default:
          return [
            `Analyze "${deal.name}" deal metrics and history`,
            `Generate follow-up plan for ${deal.name} (${deal.amount})`,
            `Review last meeting from ${deal.lastActivity}`,
            `Draft next steps for "${deal.activityStatus}"`,
            `Calculate win probability for ${deal.amount} deal`
          ];
      }
    }

    if (selectedItem?.type === 'proposal') {
      const proposal = selectedItem;
      
      const statusBasedPrompts = {
        'draft': [
          `Review draft ${proposal.proposalType} for "${proposal.name}"`,
          `Complete pricing configuration for ${proposal.amount}`,
          `Generate ${proposal.details.products.join(' & ')} package details`,
          `Create proposal timeline through ${proposal.expiryDate}`,
          `Draft approval request for ${proposal.details.owner}`,
          `Prepare product configuration checklist`
        ],
        
        'in review': [
          `Analyze stakeholder feedback for "${proposal.name}" ${proposal.proposalType}`,
          `Track review progress for ${proposal.amount} proposal`,
          `Summarize changes needed for ${proposal.details.products.join(' & ')}`,
          `Create revision plan based on feedback`,
          `Generate review meeting agenda with ${proposal.details.owner}`,
          `Draft response to legal comments`
        ],
        
        'pending approval': [
          `Prepare final approval package for "${proposal.name}"`,
          `Generate executive summary for ${proposal.amount} deal`,
          `Create implementation plan for ${proposal.details.products.join(' & ')}`,
          `Draft closing checklist and timeline`,
          `Prepare signing ceremony schedule with ${proposal.details.owner}`,
          `Generate post-signature implementation plan`
        ]
      };

      const typeBasedPrompts = {
        'Service Agreement': [
          `Review service delivery timeline`,
          `Generate resource allocation plan`,
          `Create service level metrics`
        ],
        'Master Agreement': [
          `Analyze enterprise terms compliance`,
          `Review multi-year commitment terms`,
          `Generate volume pricing tiers`
        ],
        'License Agreement': [
          `Review license scope and restrictions`,
          `Generate usage metrics framework`,
          `Create compliance checklist`
        ]
      };

      return [
        ...statusBasedPrompts[proposal.status.toLowerCase()],
        ...typeBasedPrompts[proposal.proposalType]
      ];
    }

    if (activeTab === 'dealhub') {
      return [
        "Create new proposal template",
        "Review active proposals",
        "Generate proposals summary report",
        "Analyze proposal conversion rates",
        "Review pending approvals"
      ];
    }

    return [
      "Analyze deal pipeline metrics",
      "Suggest follow-up actions for deals",
      "Generate sales forecast report"
    ];
  };

  const getContextHeader = () => {
    let appContext = currentContext.charAt(0).toUpperCase() + currentContext.slice(1);
    let itemContext = '';

    if (selectedItem?.type === 'proposal') {
      itemContext = `→ Proposal: ${selectedItem.name} (${selectedItem.amount}) - ${selectedItem.status}`;
    } else if (selectedItem?.type === 'email') {
      const dealInfo = selectedItem.dealContext 
        ? ` (${selectedItem.dealContext.dealName} - ${selectedItem.dealContext.amount})`
        : '';
      itemContext = `→ Email: ${selectedItem.subject}${dealInfo}`;
    } else if (selectedItem?.type === 'deal') {
      itemContext = `→ Deal: ${selectedItem.name} (${selectedItem.amount})`;
    }

    return (
      <div className="context-header">
        <div className="app-context">
          <span className="context-label">App:</span> {appContext}
        </div>
        {itemContext && (
          <div className="item-context">
            {itemContext}
          </div>
        )}
      </div>
    );
  };

  const widgetRef = useRef(null);
  const inputRef = useRef(null);

  const agents = [
    { id: 'gmail', name: 'Gmail', icon: '📧' },
    { id: 'calendar', name: 'Calendar', icon: '📅' },
    { id: 'dealhub', name: 'Dealhub', icon: '📊' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'web', name: 'Web', icon: '🌐' },
    { id: 'hubspot', name: 'Hubspot', icon: '📈' },
    { id: 'clari', name: 'Clari', icon: '📋' },
    { id: 'aha', name: 'Aha', icon: '💡' },
    { id: 'slack', name: 'Slack', icon: '💬' }
  ];

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('drag-handle')) {
      setIsDragging(true);
      const rect = widgetRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Check if we should show agents list
    const lastAtSymbol = value.lastIndexOf('@');
    if (lastAtSymbol !== -1 && lastAtSymbol < value.length) {
      setShowAgentsList(true);
    } else {
      setShowAgentsList(false);
    }
  };

  const insertAgent = (agent) => {
    const beforeAt = inputValue.substring(0, inputValue.lastIndexOf('@'));
    const afterAt = inputValue.substring(inputRef.current.selectionStart);
    setInputValue(`${beforeAt}@${agent.id} ${afterAt}`);
    setShowAgentsList(false);
    inputRef.current.focus();
  };

  return (
    <div
      ref={widgetRef}
      className={`chat-widget ${isExpanded ? 'expanded' : 'collapsed'}`}
      style={{ left: position.x, top: position.y }}
    >
      <div className="drag-handle" onMouseDown={handleMouseDown}>
        <span>AI Assistant</span>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '−' : '+'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="chat-content">
          {showContextSwitchPrompt ? (
            <div className="context-switch-prompt">
              <p>You have an active deal in context. Switch to {pendingTab}?</p>
              <div className="context-switch-buttons">
                <button onClick={() => handleContextSwitch(true)}>Yes, switch context</button>
                <button onClick={() => handleContextSwitch(false)}>No, stay here</button>
              </div>
            </div>
          ) : (
            <>
              {getContextHeader()}
              <div className="prompts-container">
                {getContextualPrompts().map((prompt, index) => (
                  <button 
                    key={index} 
                    className="prompt-button"
                    onClick={() => setInputValue(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <div className="chat-input">
                <div className="input-wrapper">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type @ to mention an agent..."
                  />
                  {showAgentsList && (
                    <div className="agents-list">
                      {agents.map(agent => (
                        <button
                          key={agent.id}
                          className="agent-item"
                          onClick={() => insertAgent(agent)}
                        >
                          <span className="agent-icon">{agent.icon}</span>
                          <span className="agent-name">{agent.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button>Send</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatWidget; 