import '@servicenow/sdk/global';
import { BusinessRule } from '@servicenow/sdk/core';

// Business rule to schedule next discovery run when configuration is updated
export const schedule_next_discovery_run = BusinessRule({
    $id: Now.ID['schedule-next-discovery'],
    name: 'Schedule Next Discovery Run',
    table: 'x_1791907_cmdb_dis_discovery_config',
    when: 'after',
    action: ['insert', 'update'],
    order: 100,
    active: true,
    script: Now.include('../../server/business-rules/schedule-discovery.js')
});