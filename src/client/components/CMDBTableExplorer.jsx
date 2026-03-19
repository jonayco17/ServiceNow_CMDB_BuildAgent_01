import React, { useState, useEffect } from 'react';
import './CMDBTableExplorer.css';

export default function CMDBTableExplorer({ service, onSelectTable }) {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableFields, setTableFields] = useState([]);

  useEffect(() => {
    loadCMDBTables();
  }, []);

  const loadCMDBTables = async () => {
    try {
      setLoading(true);
      const cmdbTables = await service.discoverCMDBTables();
      setTables(cmdbTables);
      setError(null);
    } catch (err) {
      setError('Failed to load CMDB tables: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadTableFields = async (tableName) => {
    try {
      const fields = await service.getTableFields(tableName);
      setTableFields(fields);
    } catch (err) {
      setError('Failed to load table fields: ' + err.message);
    }
  };

  const handleTableSelect = async (table) => {
    const tableName = service.extractFieldValue(table.name, false);
    setSelectedTable(table);
    await loadTableFields(tableName);
  };

  const filteredTables = tables.filter(table => {
    const name = service.extractFieldValue(table.name, false) || '';
    const label = service.extractFieldValue(table.label) || '';
    const search = searchTerm.toLowerCase();
    return name.toLowerCase().includes(search) || label.toLowerCase().includes(search);
  });

  if (loading) {
    return <div className="loading">Loading CMDB tables...</div>;
  }

  return (
    <div className="cmdb-table-explorer">
      <div className="explorer-header">
        <h2>CMDB Tables Discovery</h2>
        <p>Discover and explore available CMDB tables for configuration mapping</p>
        
        <div className="search-section">
          <input
            type="text"
            className="form-control"
            placeholder="Search tables by name or label..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" onClick={loadCMDBTables}>
            Refresh
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="explorer-content">
        <div className="tables-section">
          <h3>Hello World! Available CMDB Tables ({filteredTables.length})</h3>
          
          {filteredTables.length === 0 ? (
            <p>No CMDB tables found matching your search criteria.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Table Name</th>
                  <th>Label</th>
                  <th>Super Class</th>
                  <th>Scope</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTables.map((table, index) => {
                  const tableName = service.extractFieldValue(table.name, false);
                  const tableLabel = service.extractFieldValue(table.label);
                  const superClass = service.extractFieldValue(table.super_class);
                  const scope = service.extractFieldValue(table.sys_scope);
                  
                  return (
                    <tr 
                      key={index} 
                      className={selectedTable === table ? 'selected' : ''}
                      onClick={() => handleTableSelect(table)}
                    >
                      <td>
                        <code>{tableName}</code>
                      </td>
                      <td>{tableLabel}</td>
                      <td>
                        <span className="super-class">{superClass}</span>
                      </td>
                      <td>
                        <span className="scope-badge">{scope}</span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTable(table);
                          }}
                        >
                          Configure Discovery
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {selectedTable && (
          <div className="table-details-section">
            <div className="card">
              <div className="card-header">
                <h3>Table Details: {service.extractFieldValue(selectedTable.label)}</h3>
                <button 
                  className="btn btn-primary"
                  onClick={() => onSelectTable(selectedTable)}
                >
                  Create Discovery Config
                </button>
              </div>
              
              <div className="table-info">
                <div className="info-row">
                  <strong>Table Name:</strong> 
                  <code>{service.extractFieldValue(selectedTable.name, false)}</code>
                </div>
                <div className="info-row">
                  <strong>Super Class:</strong> 
                  {service.extractFieldValue(selectedTable.super_class)}
                </div>
                <div className="info-row">
                  <strong>Extends:</strong> 
                  {service.extractFieldValue(selectedTable.extends) || 'None'}
                </div>
                <div className="info-row">
                  <strong>Extendable:</strong> 
                  {service.extractFieldValue(selectedTable.is_extendable) === 'true' ? 'Yes' : 'No'}
                </div>
              </div>

              <h4>Hello World! Available Fields ({tableFields.length})</h4>
              <div className="fields-grid">
                {tableFields.map((field, index) => {
                  const fieldName = service.extractFieldValue(field.element, false);
                  const fieldLabel = service.extractFieldValue(field.column_label);
                  const fieldType = service.extractFieldValue(field.internal_type, false);
                  const isMandatory = service.extractFieldValue(field.mandatory, false) === 'true';
                  const isReadOnly = service.extractFieldValue(field.read_only, false) === 'true';
                  
                  return (
                    <div key={index} className="field-card">
                      <div className="field-name">
                        <code>{fieldName}</code>
                        {isMandatory && <span className="mandatory">*</span>}
                        {isReadOnly && <span className="readonly">RO</span>}
                      </div>
                      <div className="field-label">{fieldLabel}</div>
                      <div className="field-type">{fieldType}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}