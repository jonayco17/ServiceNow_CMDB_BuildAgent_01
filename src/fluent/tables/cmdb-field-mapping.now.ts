import '@servicenow/sdk/global';
import { Table, StringColumn, BooleanColumn, ReferenceColumn, IntegerColumn } from '@servicenow/sdk/core';

// Field mapping configuration table
export const x_1791907_cmdb_dis_field_mapping = Table({
  name: 'x_1791907_cmdb_dis_field_mapping',
  label: 'CMDB Field Mapping',
  schema: {
    discovery_config: ReferenceColumn({
      label: 'Discovery Configuration',
      referenceTable: 'x_1791907_cmdb_dis_discovery_config',
      mandatory: true
    }),
    source_field: StringColumn({
      label: 'Source Field',
      maxLength: 80,
      mandatory: true
    }),
    target_field: StringColumn({
      label: 'Target Field',
      maxLength: 80,
      mandatory: true
    }),
    field_type: StringColumn({
      label: 'Field Type',
      choices: {
        string: { label: 'String', sequence: 0 },
        reference: { label: 'Reference', sequence: 1 },
        choice: { label: 'Choice', sequence: 2 },
        boolean: { label: 'Boolean', sequence: 3 },
        integer: { label: 'Integer', sequence: 4 },
        decimal: { label: 'Decimal', sequence: 5 },
        date: { label: 'Date', sequence: 6 },
        datetime: { label: 'Date/Time', sequence: 7 }
      },
      dropdown: 'dropdown_with_none'
    }),
    transformation_script: StringColumn({
      label: 'Transformation Script',
      maxLength: 2000
    }),
    is_key_field: BooleanColumn({
      label: 'Is Key Field',
      default: 'false'
    }),
    mandatory: BooleanColumn({
      label: 'Mandatory',
      default: 'false'
    }),
    sequence: IntegerColumn({
      label: 'Sequence',
      default: '100'
    }),
    active: BooleanColumn({
      label: 'Active',
      default: 'true'
    })
  },
  accessible_from: 'public',
  actions: ['create', 'read', 'update', 'delete'],
  allow_web_service_access: true,
  display: 'source_field'
});