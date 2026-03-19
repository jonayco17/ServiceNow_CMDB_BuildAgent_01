import '@servicenow/sdk/global';
import { UiPage } from '@servicenow/sdk/core';
import cmdbDiscoveryPage from '../../client/index.html';

export const cmdb_discovery_manager = UiPage({
  $id: Now.ID['cmdb-discovery-manager'], 
  endpoint: 'x_1791907_cmdb_dis_discovery_manager.do',
  description: 'CMDB Discovery Manager - Configure and manage custom ITOM discovery',
  category: 'general',
  html: cmdbDiscoveryPage,
  direct: true
});