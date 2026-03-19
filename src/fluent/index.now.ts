import '@servicenow/sdk/global';

// Export tables
export * from './tables/cmdb-discovery-config.now';
export * from './tables/cmdb-field-mapping.now';

// Export script includes
export * from './script-includes/cmdb-discovery-utils.now';

// Export business rules
export * from './business-rules/schedule-discovery.now';

// Export REST APIs
export * from './scripted-rest-apis/cmdb-discovery-api.now';

// Export UI pages
export * from './ui-pages/cmdb-discovery-manager.now';