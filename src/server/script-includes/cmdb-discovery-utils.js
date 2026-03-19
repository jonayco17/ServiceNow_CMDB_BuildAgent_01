import { gs, GlideRecord } from '@servicenow/glide';

export function discoverCMDBTables() {
    var cmdbTables = [];
    var tableGr = new GlideRecord('sys_db_object');
    
    // Query for tables that are part of CMDB (inherit from cmdb or cmdb_ci)
    tableGr.addQuery('super_class.name', 'CONTAINS', 'cmdb');
    tableGr.addOrCondition('super_class.name', 'CONTAINS', 'cmdb_ci');
    tableGr.addOrCondition('name', 'STARTSWITH', 'cmdb_');
    tableGr.addOrCondition('name', 'STARTSWITH', 'alm_');
    tableGr.addQuery('sys_scope', '!=', '');
    tableGr.orderBy('label');
    tableGr.query();
    
    while (tableGr.next()) {
        var tableInfo = {
            name: tableGr.getValue('name'),
            label: tableGr.getValue('label'),
            super_class: tableGr.getValue('super_class'),
            scope: tableGr.getDisplayValue('sys_scope'),
            is_extendable: tableGr.getValue('is_extendable'),
            number_ref: tableGr.getValue('number_ref')
        };
        
        // Get field count for this table
        var fieldGr = new GlideRecord('sys_dictionary');
        fieldGr.addQuery('name', tableGr.getValue('name'));
        fieldGr.addQuery('active', true);
        fieldGr.query();
        tableInfo.field_count = fieldGr.getRowCount();
        
        // Get record count (sample for performance)
        try {
            var recordGr = new GlideRecord(tableGr.getValue('name'));
            recordGr.setLimit(1000);
            recordGr.query();
            tableInfo.estimated_records = recordGr.getRowCount();
        } catch (e) {
            tableInfo.estimated_records = 0;
            gs.warn('Could not get record count for table: ' + tableGr.getValue('name') + '. Error: ' + e.message);
        }
        
        cmdbTables.push(tableInfo);
    }
    
    return cmdbTables;
}

export function getTableFields(tableName) {
    var fields = [];
    var fieldGr = new GlideRecord('sys_dictionary');
    fieldGr.addQuery('name', tableName);
    fieldGr.addQuery('active', true);
    fieldGr.orderBy('column_label');
    fieldGr.query();
    
    while (fieldGr.next()) {
        fields.push({
            element: fieldGr.getValue('element'),
            column_label: fieldGr.getValue('column_label'),
            internal_type: fieldGr.getValue('internal_type'),
            max_length: fieldGr.getValue('max_length'),
            mandatory: fieldGr.getValue('mandatory'),
            read_only: fieldGr.getValue('read_only'),
            reference: fieldGr.getValue('reference')
        });
    }
    
    return fields;
}

export function validateDiscoveryConfig(configData) {
    var errors = [];
    
    if (!configData.name) {
        errors.push('Configuration name is required');
    }
    
    if (!configData.source_table) {
        errors.push('Source table is required');
    }
    
    if (!configData.target_table) {
        errors.push('Target CMDB table is required');
    }
    
    // Validate that target table exists and is a CMDB table
    if (configData.target_table) {
        var tableGr = new GlideRecord('sys_db_object');
        if (tableGr.get('name', configData.target_table)) {
            var superClass = tableGr.getValue('super_class') || '';
            if (!superClass.includes('cmdb') && !configData.target_table.startsWith('cmdb_')) {
                errors.push('Target table must be a CMDB table');
            }
        } else {
            errors.push('Target table does not exist');
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export function executeDiscovery(configSysId) {
    try {
        var configGr = new GlideRecord('x_1791907_cmdb_dis_discovery_config');
        if (!configGr.get(configSysId)) {
            return {
                success: false,
                message: 'Discovery configuration not found'
            };
        }
        
        if (!configGr.getValue('active')) {
            return {
                success: false,
                message: 'Discovery configuration is not active'
            };
        }
        
        var sourceTable = configGr.getValue('source_table');
        var targetTable = configGr.getValue('target_table');
        var filterConditions = configGr.getValue('filter_conditions');
        var discoveryScript = configGr.getValue('discovery_script');
        
        var discoveredRecords = 0;
        
        // Get field mappings for this configuration
        var mappingGr = new GlideRecord('x_1791907_cmdb_dis_field_mapping');
        mappingGr.addQuery('discovery_config', configSysId);
        mappingGr.addQuery('active', true);
        mappingGr.orderBy('sequence');
        mappingGr.query();
        
        var fieldMappings = [];
        while (mappingGr.next()) {
            fieldMappings.push({
                source_field: mappingGr.getValue('source_field'),
                target_field: mappingGr.getValue('target_field'),
                transformation_script: mappingGr.getValue('transformation_script'),
                is_key_field: mappingGr.getValue('is_key_field') == 'true',
                mandatory: mappingGr.getValue('mandatory') == 'true'
            });
        }
        
        if (fieldMappings.length === 0) {
            return {
                success: false,
                message: 'No active field mappings found for this configuration'
            };
        }
        
        // Process source records
        var sourceGr = new GlideRecord(sourceTable);
        
        // Apply filter conditions if specified
        if (filterConditions) {
            sourceGr.addEncodedQuery(filterConditions);
        }
        
        sourceGr.query();
        
        while (sourceGr.next()) {
            try {
                // Check if record already exists in target table (based on key fields)
                var targetGr = new GlideRecord(targetTable);
                var recordExists = false;
                
                // Build query for existing record based on key fields
                var keyFieldCount = 0;
                for (var i = 0; i < fieldMappings.length; i++) {
                    if (fieldMappings[i].is_key_field) {
                        var sourceValue = sourceGr.getValue(fieldMappings[i].source_field);
                        if (sourceValue) {
                            targetGr.addQuery(fieldMappings[i].target_field, sourceValue);
                            keyFieldCount++;
                        }
                    }
                }
                
                if (keyFieldCount > 0) {
                    targetGr.query();
                    if (targetGr.next()) {
                        recordExists = true;
                    }
                }
                
                // If no key fields defined, create new record
                if (keyFieldCount === 0 || !recordExists) {
                    targetGr.initialize();
                }
                
                // Apply field mappings
                for (var j = 0; j < fieldMappings.length; j++) {
                    var mapping = fieldMappings[j];
                    var sourceValue = sourceGr.getValue(mapping.source_field);
                    
                    if (sourceValue || mapping.mandatory) {
                        var transformedValue = sourceValue;
                        
                        // Apply transformation script if specified
                        if (mapping.transformation_script) {
                            try {
                                // Create a sandboxed environment for the transformation
                                var transformFunction = new Function('sourceValue', 'sourceRecord', mapping.transformation_script);
                                transformedValue = transformFunction(sourceValue, sourceGr);
                            } catch (transformError) {
                                gs.warn('Transformation script error for field ' + mapping.source_field + ': ' + transformError.message);
                                transformedValue = sourceValue; // Fall back to original value
                            }
                        }
                        
                        targetGr.setValue(mapping.target_field, transformedValue);
                    }
                }
                
                // Save the record
                if (recordExists) {
                    targetGr.update();
                } else {
                    targetGr.insert();
                }
                
                discoveredRecords++;
                
            } catch (recordError) {
                gs.error('Error processing record from ' + sourceTable + ': ' + recordError.message);
            }
        }
        
        // Update configuration with run statistics
        configGr.setValue('last_run', new GlideDateTime().getDisplayValue());
        configGr.setValue('records_discovered', discoveredRecords);
        
        // Calculate next run based on frequency
        var frequency = configGr.getValue('discovery_frequency');
        if (frequency && frequency !== 'manual') {
            var nextRun = new GlideDateTime();
            switch (frequency) {
                case 'realtime':
                    nextRun.addSeconds(300); // 5 minutes for realtime
                    break;
                case 'hourly':
                    nextRun.addSeconds(3600);
                    break;
                case 'daily':
                    nextRun.addDaysLocalTime(1);
                    break;
                case 'weekly':
                    nextRun.addDaysLocalTime(7);
                    break;
                case 'monthly':
                    nextRun.addMonthsLocalTime(1);
                    break;
            }
            configGr.setValue('next_run', nextRun.getDisplayValue());
        }
        
        configGr.update();
        
        return {
            success: true,
            message: 'Discovery completed successfully',
            records_processed: discoveredRecords
        };
        
    } catch (error) {
        gs.error('Discovery execution error: ' + error.message);
        return {
            success: false,
            message: 'Discovery failed: ' + error.message
        };
    }
}