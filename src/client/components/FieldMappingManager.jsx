import React, { useState, useEffect } from 'react';

export default function FieldMappingManager({ service, selectedConfig, onConfigChange }) {
  const [mappings, setMappings] = useState([]);
  const [sourceFields, setSourceFields] = useState([]);
  const [targetFields, setTargetFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMapping, setEditingMapping] = useState(null);
  
  const [formData, setFormData] = useState({
    source_field: '',
    target_field: '',
    field_type: '',
    transformation_script: '',
    is_key_field: false,
    mandatory: false,
    sequence: 100,
    active: true
  });

  useEffect(() => {
    if (selectedConfig) {
      loadMappings();
      loadFields();
    }
  }, [selectedConfig]);

  const loadMappings = async () => {
    if (!selectedConfig) return;
    
    try {
      setLoading(true);
      const configSysId = service.extractFieldValue(selectedConfig.sys_id, false);
      const data = await service.getFieldMappings(configSysId);
      setMappings(data);
      setError(null);
    } catch (err) {
      setError('Failed to load field mappings: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadFields = async () => {
    if (!selectedConfig) return;
    
    try {
      const sourceTable = service.extractFieldValue(selectedConfig.source_table, false);
      const targetTable = service.extractFieldValue(selectedConfig.target_table, false);
      
      const [sourceFieldsData, targetFieldsData] = await Promise.all([
        service.getTableFields(sourceTable),
        service.getTableFields(targetTable)
      ]);
      
      setSourceFields(sourceFieldsData);
      setTargetFields(targetFieldsData);
    } catch (err) {
      setError('Failed to load table fields: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const mappingData = {
        ...formData,
        discovery_config: service.extractFieldValue(selectedConfig.sys_id, false)
      };
      
      if (editingMapping) {
        const mappingSysId = service.extractFieldValue(editingMapping.sys_id, false);
        await service.updateFieldMapping(mappingSysId, mappingData);
        setSuccess('Field mapping updated successfully!');
      } else {
        await service.createFieldMapping(mappingData);
        setSuccess('Field mapping created successfully!');
      }
      
      await loadMappings();
      resetForm();
    } catch (err) {
      setError('Failed to save field mapping: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (mapping) => {
    const mappingData = {
      source_field: service.extractFieldValue(mapping.source_field, false),
      target_field: service.extractFieldValue(mapping.target_field, false),
      field_type: service.extractFieldValue(mapping.field_type, false),
      transformation_script: service.extractFieldValue(mapping.transformation_script) || '',
      is_key_field: service.extractFieldValue(mapping.is_key_field, false) === 'true',
      mandatory: service.extractFieldValue(mapping.mandatory, false) === 'true',
      sequence: parseInt(service.extractFieldValue(mapping.sequence, false)) || 100,
      active: service.extractFieldValue(mapping.active, false) === 'true'
    };
    
    setFormData(mappingData);
    setEditingMapping(mapping);
    setShowForm(true);
  };

  const handleDelete = async (mapping) => {
    if (!confirm('Are you sure you want to delete this field mapping?')) {
      return;
    }

    try {
      setLoading(true);
      const mappingSysId = service.extractFieldValue(mapping.sys_id, false);
      await service.deleteFieldMapping(mappingSysId);
      setSuccess('Field mapping deleted successfully!');
      await loadMappings();
    } catch (err) {
      setError('Failed to delete field mapping: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      source_field: '',
      target_field: '',
      field_type: '',
      transformation_script: '',
      is_key_field: false,
      mandatory: false,
      sequence: 100,
      active: true
    });
    setEditingMapping(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const autoFillFieldType = (fieldName, isSource = true) => {
    const fields = isSource ? sourceFields : targetFields;
    const field = fields.find(f => service.extractFieldValue(f.element, false) === fieldName);
    
    if (field) {
      const fieldType = service.extractFieldValue(field.internal_type, false);
      setFormData(prev => ({ ...prev, field_type: fieldType }));
    }
  };

  if (!selectedConfig) {
    return (
      <div className="field-mapping-manager">
        <p>Please select a discovery configuration first.</p>
      </div>
    );
  }

  const configName = service.extractFieldValue(selectedConfig.name);
  const sourceTable = service.extractFieldValue(selectedConfig.source_table, false);
  const targetTable = service.extractFieldValue(selectedConfig.target_table, false);

  return (
    <div className="field-mapping-manager">
      <div className="manager-header">
        <div>
          <h2>Field Mapping Configuration</h2>
          <p>
            <strong>Configuration:</strong> {configName} |
            <strong> Source:</strong> <code>{sourceTable}</code> →
            <strong> Target:</strong> <code>{targetTable}</code>
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Add Field Mapping
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {showForm && (
        <div className="mapping-form-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingMapping ? 'Edit' : 'Add'} Field Mapping</h3>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Source Field*</label>
                  <select
                    name="source_field"
                    className="form-control"
                    value={formData.source_field}
                    onChange={(e) => {
                      handleInputChange(e);
                      autoFillFieldType(e.target.value, true);
                    }}
                    required
                  >
                    <option value="">Select source field</option>
                    {sourceFields.map((field, index) => {
                      const fieldName = service.extractFieldValue(field.element, false);
                      const fieldLabel = service.extractFieldValue(field.column_label);
                      return (
                        <option key={index} value={fieldName}>
                          {fieldName} ({fieldLabel})
                        </option>
                      );
                    })}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Target Field*</label>
                  <select
                    name="target_field"
                    className="form-control"
                    value={formData.target_field}
                    onChange={(e) => {
                      handleInputChange(e);
                      autoFillFieldType(e.target.value, false);
                    }}
                    required
                  >
                    <option value="">Select target field</option>
                    {targetFields.map((field, index) => {
                      const fieldName = service.extractFieldValue(field.element, false);
                      const fieldLabel = service.extractFieldValue(field.column_label);
                      return (
                        <option key={index} value={fieldName}>
                          {fieldName} ({fieldLabel})
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Field Type</label>
                  <select
                    name="field_type"
                    className="form-control"
                    value={formData.field_type}
                    onChange={handleInputChange}
                  >
                    <option value="">Auto-detect</option>
                    <option value="string">String</option>
                    <option value="reference">Reference</option>
                    <option value="choice">Choice</option>
                    <option value="boolean">Boolean</option>
                    <option value="integer">Integer</option>
                    <option value="decimal">Decimal</option>
                    <option value="date">Date</option>
                    <option value="datetime">Date/Time</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Sequence</label>
                  <input
                    type="number"
                    name="sequence"
                    className="form-control"
                    value={formData.sequence}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Transformation Script</label>
                <textarea
                  name="transformation_script"
                  className="form-control"
                  value={formData.transformation_script}
                  onChange={handleInputChange}
                  placeholder="return transformedValue; // Custom transformation logic (optional)"
                  rows="3"
                />
                <small>
                  Available variables: sourceValue, sourceRecord. Must return the transformed value.
                </small>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="is_key_field"
                    checked={formData.is_key_field}
                    onChange={handleInputChange}
                  />
                  Key Field (used for matching existing records)
                </label>
                
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="mandatory"
                    checked={formData.mandatory}
                    onChange={handleInputChange}
                  />
                  Mandatory Field
                </label>
                
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                  />
                  Active Mapping
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : (editingMapping ? 'Update' : 'Add')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mappings-list">
        <h3>Field Mappings ({mappings.length})</h3>
        
        {loading && mappings.length === 0 ? (
          <div className="loading">Loading field mappings...</div>
        ) : mappings.length === 0 ? (
          <p>No field mappings configured. Add your first mapping to get started.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Source Field</th>
                <th>Target Field</th>
                <th>Type</th>
                <th>Flags</th>
                <th>Sequence</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mappings
                .sort((a, b) => {
                  const seqA = parseInt(service.extractFieldValue(a.sequence, false)) || 100;
                  const seqB = parseInt(service.extractFieldValue(b.sequence, false)) || 100;
                  return seqA - seqB;
                })
                .map((mapping, index) => {
                  const sourceField = service.extractFieldValue(mapping.source_field, false);
                  const targetField = service.extractFieldValue(mapping.target_field, false);
                  const fieldType = service.extractFieldValue(mapping.field_type, false);
                  const isKey = service.extractFieldValue(mapping.is_key_field, false) === 'true';
                  const isMandatory = service.extractFieldValue(mapping.mandatory, false) === 'true';
                  const isActive = service.extractFieldValue(mapping.active, false) === 'true';
                  const sequence = service.extractFieldValue(mapping.sequence, false);
                  const hasTransformation = !!service.extractFieldValue(mapping.transformation_script);

                  return (
                    <tr key={index} className={!isActive ? 'inactive-row' : ''}>
                      <td>
                        <code>{sourceField}</code>
                      </td>
                      <td>
                        <code>{targetField}</code>
                      </td>
                      <td>
                        <span className="type-badge">{fieldType || 'auto'}</span>
                      </td>
                      <td>
                        <div className="flags">
                          {isKey && <span className="flag key-flag">KEY</span>}
                          {isMandatory && <span className="flag mandatory-flag">REQ</span>}
                          {hasTransformation && <span className="flag transform-flag">SCRIPT</span>}
                          {!isActive && <span className="flag inactive-flag">INACTIVE</span>}
                        </div>
                      </td>
                      <td>{sequence}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleEdit(mapping)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(mapping)}
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