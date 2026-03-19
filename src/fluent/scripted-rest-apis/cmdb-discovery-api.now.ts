import '@servicenow/sdk/global';
import { RestApi } from '@servicenow/sdk/core';

export const cmdb_discovery_api = RestApi({
    $id: Now.ID['cmdb-discovery-api'],
    name: 'CMDB Discovery API',
    service_id: 'cmdb_discovery',
    short_description: 'API for managing and executing CMDB discovery configurations',
    active: true,
    routes: [
        {
            $id: Now.ID['get-cmdb-tables'],
            name: 'Get CMDB Tables',
            path: '/tables',
            method: 'GET',
            script: Now.include('../../server/rest-api/get-cmdb-tables.js'),
            short_description: 'Discover and return all available CMDB tables'
        }
    ],
    enforce_acl: []
});