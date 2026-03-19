import '@servicenow/sdk/global';
import { ScriptInclude } from '@servicenow/sdk/core';

export const CMDBDiscoveryUtils = ScriptInclude({
    $id: Now.ID['cmdb-discovery-utils'],
    name: 'CMDBDiscoveryUtils',
    script: Now.include('../../server/script-includes/cmdb-discovery-utils.js'),
    description: 'Utilities for CMDB discovery and table crawling functionality',
    apiName: 'x_1791907_cmdb_dis.CMDBDiscoveryUtils',
    callerAccess: 'tracking',
    clientCallable: true,
    mobileCallable: true,
    sandboxCallable: true,
    accessibleFrom: 'public',
    active: true,
});