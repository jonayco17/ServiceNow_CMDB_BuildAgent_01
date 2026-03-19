import '@servicenow/sdk/global';
import { Table, StringColumn, BooleanColumn, DateTimeColumn, IntegerColumn, ReferenceColumn } from '@servicenow/sdk/core';

// Configuration table for CMDB discovery mappings
export const x_1791907_cmdb_dis_discovery_config = Table({
  name: 'x_1791907_cmdb_dis_discovery_config',
  label: 'CMDB Discovery Configuration',
  schema: {
    name: StringColumn({ 
      label: 'Configuration Name', 
      maxLength: 100,
      mandatory: true 
    }),
    description: StringColumn({ 
      label: 'Description', 
      maxLength: 255 
    }),
    source_table: StringColumn({ 
      label: 'Source Table', 
      maxLength: 80,
      mandatory: true 
    }),
    target_table: StringColumn({ 
      label: 'Target CMDB Table', 
      maxLength: 80,
      mandatory: true 
    }),
    discovery_method: StringColumn({
      label: 'Discovery Method',
      choices: {
        api: { label: 'API Based', sequence: 0 },
        database: { label: 'Database Query', sequence: 1 },
        file: { label: 'File Import', sequence: 2 },
        script: { label: 'Custom Script', sequence: 3 }
      },
      dropdown: 'dropdown_with_none'
    }),
    discovery_frequency: StringColumn({
      label: 'Discovery Frequency',
      choices: {
        realtime: { label: 'Real-time', sequence: 0 },
        hourly: { label: 'Hourly', sequence: 1 },
        daily: { label: 'Daily', sequence: 2 },
        weekly: { label: 'Weekly', sequence: 3 },
        monthly: { label: 'Monthly', sequence: 4 },
        manual: { label: 'Manual Only', sequence: 5 }
      },
      dropdown: 'dropdown_with_none'
    }),
    active: BooleanColumn({ 
      label: 'Active', 
      default: 'true' 
    }),
    last_run: DateTimeColumn({ 
      label: 'Last Discovery Run' 
    }),
    next_run: DateTimeColumn({ 
      label: 'Next Scheduled Run' 
    }),
    records_discovered: IntegerColumn({ 
      label: 'Records Discovered',
      default: '0'
    }),
    discovery_script: StringColumn({
      label: 'Discovery Script',
      maxLength: 4000
    }),
    filter_conditions: StringColumn({
      label: 'Filter Conditions',
      maxLength: 1000
    }),
    created_by: ReferenceColumn({
      label: 'Created By',
      referenceTable: 'sys_user',
      default: 'javascript:gs.getUserID()'
    })
  },
  extensible: true,
  accessible_from: 'public',
  actions: ['create', 'read', 'update', 'delete'],
  allow_web_service_access: true,
  display: 'name'
});