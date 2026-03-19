import React, { useState, useEffect, useMemo } from 'react';
import { CMDBDiscoveryService } from './services/CMDBDiscoveryService.js';
import CMDBTableExplorer from './components/CMDBTableExplorer.jsx';
import DiscoveryConfigManager from './components/DiscoveryConfigManager.jsx';
import FieldMappingManager from './components/FieldMappingManager.jsx';
import DiscoveryMonitor from './components/DiscoveryMonitor.jsx';
import './app.css';

export default function App() {
  const service = useMemo(() => new CMDBDiscoveryService(), []);
  const [activeTab, setActiveTab] = useState('explorer');
  const [selectedConfig, setSelectedConfig] = useState(null);

  return (
    <div className="cmdb-discovery-app">
      <header className="app-header">
        <h1>CMDB Discovery Manager</h1>
        <p>Custom ITOM Discovery Configuration and Management</p>
      </header>

      <nav className="app-navigation">
        <button 
          className={`nav-tab ${activeTab === 'explorer' ? 'active' : ''}`}
          onClick={() => setActiveTab('explorer')}
        >
          CMDB Tables
        </button>
        <button 
          className={`nav-tab ${activeTab === 'config' ? 'active' : ''}`}
          onClick={() => setActiveTab('config')}
        >
          Discovery Config
        </button>
        <button 
          className={`nav-tab ${activeTab === 'mapping' ? 'active' : ''}`}
          onClick={() => setActiveTab('mapping')}
        >
          Field Mapping
        </button>
        <button 
          className={`nav-tab ${activeTab === 'monitor' ? 'active' : ''}`}
          onClick={() => setActiveTab('monitor')}
        >
          Discovery Monitor
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'explorer' && (
          <CMDBTableExplorer 
            service={service}
            onSelectTable={(table) => {
              setSelectedConfig({ target_table: table.name });
              setActiveTab('config');
            }}
          />
        )}
        
        {activeTab === 'config' && (
          <DiscoveryConfigManager 
            service={service}
            initialConfig={selectedConfig}
            onSelectConfig={(config) => {
              setSelectedConfig(config);
              setActiveTab('mapping');
            }}
          />
        )}
        
        {activeTab === 'mapping' && (
          <FieldMappingManager 
            service={service}
            selectedConfig={selectedConfig}
            onConfigChange={setSelectedConfig}
          />
        )}
        
        {activeTab === 'monitor' && (
          <DiscoveryMonitor 
            service={service}
            selectedConfig={selectedConfig}
          />
        )}
      </main>
    </div>
  );
}