import { gs } from '@servicenow/glide';
import { RESTAPIRequest, RESTAPIResponse } from '@servicenow/glide/sn_ws_int';

export function getCMDBTables(request, response) {
    try {
        // Import our discovery utility function
        var discoveryUtils = new x_1791907_cmdb_dis.CMDBDiscoveryUtils();
        var cmdbTables = discoveryUtils.discoverCMDBTables();
        
        response.setStatus(200);
        response.setBody({
            success: true,
            result: cmdbTables,
            total: cmdbTables.length
        });
        
    } catch (error) {
        gs.error('CMDB Discovery API - Get Tables Error: ' + error.message);
        response.setStatus(500);
        response.setBody({
            success: false,
            error: error.message,
            message: 'Failed to discover CMDB tables'
        });
    }
}