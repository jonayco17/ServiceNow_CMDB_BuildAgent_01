import React, { useState, useEffect } from 'react';
import './DiscoveryConfigManager.css';

export default function DiscoveryConfigManager({ service, initialConfig, onSelectConfig }) {
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingConfig, setEditingConfig] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    source_table: '',
    target_table: '',
    discovery_method: '',
    discovery_frequency: '',
    filter_conditions: '',
    discovery_script: '',
    active: true
  });

  useEffect(() => {
    loadConfigs();
  }, []);

  useEffect(() => {
    if (initialConfig) {
      setFormData(prev => ({
        ...prev,
        target_table: initialConfig.target_table || ''
      }));
      setShowForm(true);
    }
  }, [initialConfig]);

  const loadConfigs = async () => {
    try {
      setLoading(true);
      const data = await service.getDiscoveryConfigs();
      setConfigs(data);
      setError(null);
    } catch (err) {
      setError('Failed to load discovery configurations: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (editingConfig) {
        const configSysId = service.extractFieldValue(editingConfig.sys_id, false);
        await service.updateDiscoveryConfig(configSysId, formData);
        setSuccess('Discovery configuration updated successfully!');
      } else {
        await service.createDiscoveryConfig(formData);
        setSuccess('Discovery configuration created successfully!');
      }
      
      await loadConfigs();
      resetForm();
    } catch (err) {
      setError('Failed to save discovery configuration: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (config) => {
    const configData = {
      name: service.extractFieldValue(config.name),
      description: service.extractFieldValue(config.description) || '',
      source_table: service.extractFieldValue(config.source_table),
      target_table: service.extractFieldValue(config.target_table),
      discovery_method: service.extractFieldValue(config.discovery_method, false),
      discovery_frequency: service.extractFieldValue(config.discovery_frequency, false),
      filter_conditions: service.extractFieldValue(config.filter_conditions) || '',
      discovery_script: service.extractFieldValue(config.discovery_script) || '',
      active: service.extractFieldValue(config.active, false) === 'true'
    };
    
    setFormData(configData);
    setEditingConfig(config);
    setShowForm(true);
  };

  const handleDelete = async (config) => {
    if (!confirm('Are you sure you want to delete this configuration?')) {
      return;
    }

    try {
      setLoading(true);
      const configSysId = service.extractFieldValue(config.sys_id, false);
      await service.deleteDiscoveryConfig(configSysId);
      setSuccess('Discovery configuration deleted successfully!');
      await loadConfigs();
    } catch (err) {
      setError('Failed to delete discovery configuration: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      source_table: '',
      target_table: initialConfig?.target_table || '',
      discovery_method: '',
      discovery_frequency: '',
      filter_conditions: '',
      discovery_script: '',
      active: true
    });
    setEditingConfig(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="discovery-config-manager">
      <div className="manager-header">
        <h2>Discovery Configuration Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          + New Configuration
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {showForm && (
        <div className="config-form-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingConfig ? 'Edit' : 'Create'} Discovery Configuration</h3>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Configuration Name*</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Source Table*</label>
                  <input
                    type="text"
                    name="source_table"
                    className="form-control"
                    value={formData.source_table}
                    onChange={handleInputChange}
                    placeholder="e.g., incident, change_request"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Target CMDB Table*</label>
                  <input
                    type="text"
                    name="target_table"
                    className="form-control"
                    value={formData.target_table}
                    onChange={handleInputChange}
                    placeholder="e.g., cmdb_ci_server, cmdb_ci_computer"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Discovery Method</label>
                  <select
                    name="discovery_method"
                    className="form-control"
                    value={formData.discovery_method}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Method</option>
                    <option value="api">API Based</option>
                    <option value="database">Database Query</option>
                    <option value="file">File Import</option>
                    <option value="script">Custom Script</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Discovery Frequency</label>
                  <select
                    name="discovery_frequency"
                    className="form-control"
                    value={formData.discovery_frequency}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Frequency</option>
                    <option value="realtime">Real-time</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="manual">Manual Only</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Filter Conditions</label>
                <textarea
                  name="filter_conditions"
                  className="form-control"
                  value={formData.filter_conditions}
                  onChange={handleInputChange}
                  placeholder="Enter encoded query conditions (optional)"
                  rows="2"
                />
              </div>

              <div className="form-group">
                <label>Discovery Script</label>
                <textarea
                  name="discovery_script"
                  className="form-control"
                  value={formData.discovery_script}
                  onChange={handleInputChange}
                  placeholder="Custom script for advanced discovery logic (optional)"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                  />
                  Active Configuration
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : (editingConfig ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="configs-list">
        <h3>Existing Configurations ({configs.length})</h3>
        
        {loading && configs.length === 0 ? (
          <div className="loading">Loading configurations...</div>
        ) : configs.length === 0 ? (
          <p>No discovery configurations found. Create your first configuration to get started.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Source → Target</th>
                <th>Method</th>
                <th>Frequency</th>
                <th>Status</th>
                <th>Last Run</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {configs.map((config, index) => {
                const name = service.extractFieldValue(config.name);
                const sourceTable = service.extractFieldValue(config.source_table);
                const targetTable = service.extractFieldValue(config.target_table);
                const method = service.extractFieldValue(config.discovery_method);
                const frequency = service.extractFieldValue(config.discovery_frequency);
                const isActive = service.extractFieldValue(config.active, false) === 'true';
                const lastRun = service.extractFieldValue(config.last_run);
                const recordsDiscovered = service.extractFieldValue(config.records_discovered, false);

                return (
                  <tr key={index}>
                    <td>
                      <strong>{name}</strong>
                      {recordsDiscovered && (
                        <small style={{display: 'block', color: '#666'}}>
                          {recordsDiscovered} records
                        </small>
                      )}
                    </td>
                    <td>
                      <code>{sourceTable}</code>
                      <br />
                      <span style={{color: '#666'}}>↓</span>
                      <br />
                      <code>{targetTable}</code>
                    </td>
                    <td>
                      <span className="method-badge">{method || 'Not set'}</span>
                    </td>
                    <td>
                      <span className="frequency-badge">{frequency || 'Manual'}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${isActive ? 'status-active' : 'status-inactive'}`}>
                        {isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      {lastRun ? new Date(lastRun).toLocaleString() : 'Never'}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => onSelectConfig(config)}
                        >
                          Configure Fields
                        </button>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleEdit(config)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(config)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}