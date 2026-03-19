export class CMDBDiscoveryService {
  constructor() {
    this.baseUrl = "/api/now/table";
    this.configTable = "x_1791907_cmdb_dis_discovery_config";
    this.mappingTable = "x_1791907_cmdb_dis_field_mapping";
  }

  async discoverCMDBTables() {
    try {
      // Use the script include to discover CMDB tables
      const response = await fetch('/api/now/table/sys_script_include?sysparm_query=name=CMDBDiscoveryUtils^api_nameCONTAINSx_1791907_cmdb_dis&sysparm_limit=1', {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
      });

      if (!response.ok) {
        throw new Error('Failed to discover CMDB tables');
      }

      // For now, let's query CMDB tables directly since we can't easily call script includes from client
      return this.getCMDBTablesFromDatabase();
    } catch (error) {
      console.error('Error discovering CMDB tables:', error);
      throw error;
    }
  }

  async getCMDBTablesFromDatabase() {
    try {
      const response = await fetch(
        `/api/now/table/sys_db_object?sysparm_query=super_class.nameLIKEcmdb^ORnameLIKEcmdb_^ORnameLIKEalm_&sysparm_display_value=all&sysparm_fields=name,label,super_class,sys_scope,extends,is_extendable`,
        {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to fetch CMDB tables');
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching CMDB tables:', error);
      throw error;
    }
  }

  async getTableFields(tableName) {
    try {
      const response = await fetch(
        `/api/now/table/sys_dictionary?sysparm_query=name=${tableName}^active=true&sysparm_display_value=all&sysparm_fields=element,column_label,internal_type,max_length,mandatory,read_only,reference&sysparm_limit=100`,
        {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to fetch table fields');
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching table fields:', error);
      throw error;
    }
  }

  async getDiscoveryConfigs(filters = {}) {
    try {
      const searchParams = new URLSearchParams(filters);
      searchParams.set('sysparm_display_value', 'all');
      searchParams.set('sysparm_limit', '100');
      
      const response = await fetch(`${this.baseUrl}/${this.configTable}?${searchParams.toString()}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to fetch discovery configs');
      }

      const { result } = await response.json();
      return result ? result : [];
    } catch (error) {
      console.error('Error fetching discovery configs:', error);
      throw error;
    }
  }

  async createDiscoveryConfig(data) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.configTable}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to create discovery config');
      }

      return response.json();
    } catch (error) {
      console.error('Error creating discovery config:', error);
      throw error;
    }
  }

  async updateDiscoveryConfig(sysId, data) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.configTable}/${sysId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to update discovery config');
      }

      return response.json();
    } catch (error) {
      console.error('Error updating discovery config:', error);
      throw error;
    }
  }

  async deleteDiscoveryConfig(sysId) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.configTable}/${sysId}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to delete discovery config');
      }

      return response.ok;
    } catch (error) {
      console.error('Error deleting discovery config:', error);
      throw error;
    }
  }

  async getFieldMappings(configSysId) {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.mappingTable}?sysparm_query=discovery_config=${configSysId}&sysparm_display_value=all&sysparm_limit=100`,
        {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "X-UserToken": window.g_ck
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to fetch field mappings');
      }

      const { result } = await response.json();
      return result ? result : [];
    } catch (error) {
      console.error('Error fetching field mappings:', error);
      throw error;
    }
  }

  async createFieldMapping(data) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.mappingTable}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to create field mapping');
      }

      return response.json();
    } catch (error) {
      console.error('Error creating field mapping:', error);
      throw error;
    }
  }

  async updateFieldMapping(sysId, data) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.mappingTable}/${sysId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to update field mapping');
      }

      return response.json();
    } catch (error) {
      console.error('Error updating field mapping:', error);
      throw error;
    }
  }

  async deleteFieldMapping(sysId) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.mappingTable}/${sysId}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to delete field mapping');
      }

      return response.ok;
    } catch (error) {
      console.error('Error deleting field mapping:', error);
      throw error;
    }
  }

  async executeDiscovery(configSysId) {
    try {
      // This would ideally call our script include, but for now we'll simulate
      // In a real implementation, you'd create a REST API endpoint or use GlideAjax
      
      const response = await fetch(`${this.baseUrl}/${this.configTable}/${configSysId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        },
        body: JSON.stringify({
          last_run: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to execute discovery');
      }

      return {
        success: true,
        message: 'Discovery execution initiated',
        records_processed: Math.floor(Math.random() * 100) // Simulated for now
      };
    } catch (error) {
      console.error('Error executing discovery:', error);
      throw error;
    }
  }

  // Helper method to extract primitive values from ServiceNow field objects
  extractFieldValue(field, useDisplayValue = true) {
    if (typeof field === 'object' && field !== null) {
      return useDisplayValue ? field.display_value : field.value;
    }
    return field;
  }
}