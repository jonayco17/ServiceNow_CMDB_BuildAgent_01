import React, { useState, useEffect } from 'react';

export default function DiscoveryMonitor({ service, selectedConfig }) {
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [executionResults, setExecutionResults] = useState({});

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    try {
      setLoading(true);
      const data = await service.getDiscoveryConfigs({ sysparm_query: 'active=true' });
      setConfigs(data);
      setError(null);
    } catch (err) {
      setError('Failed to load discovery configurations: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const executeDiscovery = async (config) => {
    try {
      setLoading(true);
      const configSysId = service.extractFieldValue(config.sys_id, false);
      const configName = service.extractFieldValue(config.name);
      
      setSuccess(`Starting discovery for "${configName}"...`);
      
      const result = await service.executeDiscovery(configSysId);
      
      setExecutionResults(prev => ({
        ...prev,
        [configSysId]: result
      }));
      
      if (result.success) {
        setSuccess(`Discovery completed for "${configName}". ${result.records_processed} records processed.`);
      } else {
        setError(`Discovery failed for "${configName}": ${result.message}`);
      }
      
      // Refresh the configs to show updated last run times
      setTimeout(() => {
        loadConfigs();
      }, 1000);
      
    } catch (err) {
      setError('Failed to execute discovery: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Never';
    try {
      return new Date(dateString).toLocaleString();
    } catch (e) {
      return dateString;
    }
  };

  const getNextRunStatus = (config) => {
    const nextRun = service.extractFieldValue(config.next_run);
    const frequency = service.extractFieldValue(config.discovery_frequency, false);
    
    if (!nextRun || frequency === 'manual') {
      return { status: 'manual', message: 'Manual execution only' };
    }
    
    const nextRunDate = new Date(nextRun);
    const now = new Date();
    
    if (nextRunDate <= now) {
      return { status: 'overdue', message: 'Overdue for execution' };
    }
    
    const timeUntil = nextRunDate - now;
    const hoursUntil = Math.floor(timeUntil / (1000 * 60 * 60));
    const minutesUntil = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hoursUntil > 24) {
      const daysUntil = Math.floor(hoursUntil / 24);
      return { status: 'scheduled', message: `In ${daysUntil} day${daysUntil === 1 ? '' : 's'}` };
    } else if (hoursUntil > 0) {
      return { status: 'scheduled', message: `In ${hoursUntil}h ${minutesUntil}m` };
    } else {
      return { status: 'soon', message: `In ${minutesUntil} minute${minutesUntil === 1 ? '' : 's'}` };
    }
  };

  if (selectedConfig) {
    const configName = service.extractFieldValue(selectedConfig.name);
    const configSysId = service.extractFieldValue(selectedConfig.sys_id, false);
    const executionResult = executionResults[configSysId];
    
    return (
      <div className="discovery-monitor">
        <div className="monitor-header">
          <h2>Discovery Monitor - {configName}</h2>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="config-details card">
          <h3>Configuration Details</h3>
          <div className="details-grid">
            <div className="detail-item">
              <strong>Source Table:</strong>
              <code>{service.extractFieldValue(selectedConfig.source_table, false)}</code>
            </div>
            <div className="detail-item">
              <strong>Target Table:</strong>
              <code>{service.extractFieldValue(selectedConfig.target_table, false)}</code>
            </div>
            <div className="detail-item">
              <strong>Method:</strong>
              {service.extractFieldValue(selectedConfig.discovery_method) || 'Not set'}
            </div>
            <div className="detail-item">
              <strong>Frequency:</strong>
              {service.extractFieldValue(selectedConfig.discovery_frequency) || 'Manual'}
            </div>
            <div className="detail-item">
              <strong>Last Run:</strong>
              {formatDateTime(service.extractFieldValue(selectedConfig.last_run))}
            </div>
            <div className="detail-item">
              <strong>Records Discovered:</strong>
              {service.extractFieldValue(selectedConfig.records_discovered, false) || '0'}
            </div>
          </div>
        </div>

        <div className="execution-section">
          <div className="execution-controls">
            <button 
              className="btn btn-primary"
              onClick={() => executeDiscovery(selectedConfig)}
              disabled={loading}
            >
              {loading ? 'Running Discovery...' : 'Run Discovery Now'}
            </button>
          </div>

          {executionResult && (
            <div className="execution-result card">
              <h4>Latest Execution Result</h4>
              <div className={`result-status ${executionResult.success ? 'success' : 'error'}`}>
                <strong>Status:</strong> {executionResult.success ? 'Success' : 'Failed'}
              </div>
              <div><strong>Message:</strong> {executionResult.message}</div>
              {executionResult.records_processed && (
                <div><strong>Records Processed:</strong> {executionResult.records_processed}</div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="discovery-monitor">
      <div className="monitor-header">
        <h2>Discovery Monitor</h2>
        <p>Monitor and execute discovery configurations</p>
        <button className="btn btn-secondary" onClick={loadConfigs}>
          Refresh
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {loading && configs.length === 0 ? (
        <div className="loading">Loading configurations...</div>
      ) : configs.length === 0 ? (
        <p>No active discovery configurations found.</p>
      ) : (
        <div className="configurations-monitor">
          <h3>Active Configurations ({configs.length})</h3>
          
          <div className="configs-grid">
            {configs.map((config, index) => {
              const configSysId = service.extractFieldValue(config.sys_id, false);
              const name = service.extractFieldValue(config.name);
              const sourceTable = service.extractFieldValue(config.source_table, false);
              const targetTable = service.extractFieldValue(config.target_table, false);
              const lastRun = service.extractFieldValue(config.last_run);
              const recordsDiscovered = service.extractFieldValue(config.records_discovered, false);
              const frequency = service.extractFieldValue(config.discovery_frequency, false);
              const nextRunInfo = getNextRunStatus(config);
              const executionResult = executionResults[configSysId];
              
              return (
                <div key={index} className="config-monitor-card">
                  <div className="card-header">
                    <h4>{name}</h4>
                    <span className={`status-indicator ${nextRunInfo.status}`}></span>
                  </div>
                  
                  <div className="config-info">
                    <div className="info-row">
                      <code>{sourceTable}</code> → <code>{targetTable}</code>
                    </div>
                    <div className="info-row">
                      <strong>Frequency:</strong> {frequency || 'manual'}
                    </div>
                    <div className="info-row">
                      <strong>Last Run:</strong> {formatDateTime(lastRun)}
                    </div>
                    <div className="info-row">
                      <strong>Records:</strong> {recordsDiscovered || '0'}
                    </div>
                    <div className={`info-row next-run-${nextRunInfo.status}`}>
                      <strong>Next Run:</strong> {nextRunInfo.message}
                    </div>
                  </div>

                  {executionResult && (
                    <div className={`execution-status ${executionResult.success ? 'success' : 'error'}`}>
                      {executionResult.success ? '✓' : '✗'} {executionResult.message}
                      {executionResult.records_processed && ` (${executionResult.records_processed} records)`}
                    </div>
                  )}

                  <div className="card-actions">
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => executeDiscovery(config)}
                      disabled={loading}
                    >
                      {loading ? 'Running...' : 'Run Now'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style jsx>{`
        .discovery-monitor {
          padding: 20px;
        }

        .monitor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .monitor-header div {
          flex-grow: 1;
        }

        .monitor-header h2 {
          margin: 0 0 5px 0;
          color: #333;
        }

        .monitor-header p {
          margin: 0;
          color: #666;
        }

        .config-details {
          margin-bottom: 30px;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .detail-item code {
          background-color: #f1f3f4;
          padding: 4px 6px;
          border-radius: 3px;
          font-size: 13px;
        }

        .execution-section {
          margin-bottom: 30px;
        }

        .execution-controls {
          margin-bottom: 20px;
        }

        .execution-result {
          background-color: #f8f9fa;
        }

        .result-status.success {
          color: #155724;
        }

        .result-status.error {
          color: #721c24;
        }

        .configs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
        }

        .config-monitor-card {
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 20px;
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .config-monitor-card .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e9ecef;
        }

        .config-monitor-card h4 {
          margin: 0;
          color: #333;
        }

        .status-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
        }

        .status-indicator.manual {
          background-color: #6c757d;
        }

        .status-indicator.scheduled {
          background-color: #28a745;
        }

        .status-indicator.soon {
          background-color: #ffc107;
        }

        .status-indicator.overdue {
          background-color: #dc3545;
        }

        .config-info {
          margin-bottom: 15px;
        }

        .info-row {
          margin-bottom: 8px;
          font-size: 14px;
        }

        .info-row code {
          background-color: #f1f3f4;
          padding: 2px 4px;
          border-radius: 2px;
          font-size: 12px;
        }

        .next-run-overdue {
          color: #dc3545;
        }

        .next-run-soon {
          color: #ffc107;
        }

        .next-run-scheduled {
          color: #28a745;
        }

        .execution-status {
          font-size: 13px;
          padding: 8px;
          border-radius: 4px;
          margin-bottom: 15px;
        }

        .execution-status.success {
          background-color: #d4edda;
          color: #155724;
        }

        .execution-status.error {
          background-color: #f8d7da;
          color: #721c24;
        }

        .card-actions {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </div>
  );
}